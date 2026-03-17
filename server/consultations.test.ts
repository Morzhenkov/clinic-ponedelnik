import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the storage module
vi.mock("./storage", () => ({
  storagePut: vi.fn(async (key: string, data: Buffer, mimeType: string) => ({
    key,
    url: `https://example.com/storage/${key}`,
  })),
}));

// Mock the database module
vi.mock("./db", () => ({
  createConsultation: vi.fn(async (consultation) => ({
    insertId: 1,
    ...consultation,
  })),
  getConsultations: vi.fn(async () => [
    {
      id: 1,
      name: "Test Patient",
      phone: "+7 (999) 999-99-99",
      program: "Новый понедельник",
      fileUrl: "https://example.com/storage/consultations/test.pdf",
      fileKey: "consultations/test.pdf",
      fileName: "test.pdf",
      fileMimeType: "application/pdf",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("consultations router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should submit a consultation without file", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.consultations.submit({
      name: "John Doe",
      phone: "+7 (999) 999-99-99",
      program: "Новый понедельник",
    });

    expect(result).toEqual({
      success: true,
      message: "Consultation request submitted successfully",
    });
  });

  it("should submit a consultation with file", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const fileBase64 = Buffer.from("test file content").toString("base64");

    const result = await caller.consultations.submit({
      name: "Jane Smith",
      phone: "+7 (888) 888-88-88",
      program: "Интенсив",
      fileData: {
        base64: fileBase64,
        fileName: "analysis.pdf",
        mimeType: "application/pdf",
      },
    });

    expect(result).toEqual({
      success: true,
      message: "Consultation request submitted successfully",
    });
  });

  it("should validate required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.consultations.submit({
        name: "",
        phone: "+7 (999) 999-99-99",
        program: "Новый понедельник",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Name is required");
    }
  });

  it("should list all consultations", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const consultations = await caller.consultations.list();

    expect(Array.isArray(consultations)).toBe(true);
    expect(consultations.length).toBeGreaterThan(0);
    expect(consultations[0]).toHaveProperty("name");
    expect(consultations[0]).toHaveProperty("phone");
    expect(consultations[0]).toHaveProperty("program");
  });
});
