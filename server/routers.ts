import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createConsultation, getConsultations } from "./db";
import { storagePut } from "./storage";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  consultations: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        phone: z.string().min(1, "Phone is required"),
        program: z.string().min(1, "Program is required"),
        fileData: z.object({
          base64: z.string(),
          fileName: z.string(),
          mimeType: z.string(),
        }).optional(),
      }))
      .mutation(async ({ input }) => {
        let fileUrl: string | undefined;
        let fileKey: string | undefined;
        let fileName: string | undefined;
        let fileMimeType: string | undefined;

        // Upload file if provided
        if (input.fileData) {
          const buffer = Buffer.from(input.fileData.base64, 'base64');
          const randomSuffix = Math.random().toString(36).substring(2, 8);
          fileKey = `consultations/${Date.now()}-${randomSuffix}-${input.fileData.fileName}`;
          
          try {
            const uploadResult = await storagePut(
              fileKey,
              buffer,
              input.fileData.mimeType
            );
            fileUrl = uploadResult.url;
            fileName = input.fileData.fileName;
            fileMimeType = input.fileData.mimeType;
          } catch (error) {
            console.error("File upload failed:", error);
            throw new Error("Failed to upload file");
          }
        }

        // Save consultation to database
        const result = await createConsultation({
          name: input.name,
          phone: input.phone,
          program: input.program,
          fileUrl,
          fileKey,
          fileName,
          fileMimeType,
        });

        return {
          success: true,
          message: "Consultation request submitted successfully",
        };
      }),
    list: publicProcedure.query(async () => {
      return await getConsultations();
    }),
  }),
});

export type AppRouter = typeof appRouter;
