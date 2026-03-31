import { ENV } from "./env";
import { TRPCError } from "@trpc/server";

export type EmailPayload = {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
};

const buildEmailEndpointUrl = (baseUrl: string): string => {
  const normalizedBase = baseUrl.endsWith("/")
    ? baseUrl
    : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendEmail",
    normalizedBase
  ).toString();
};

/**
 * Send email using Manus Email Service
 * Returns `true` if the email was sent successfully, `false` if the service is unavailable
 */
export async function sendEmail(
  payload: EmailPayload
): Promise<boolean> {
  if (!ENV.forgeApiUrl) {
    console.error("[Email] Forge API URL is not configured");
    return false;
  }

  if (!ENV.forgeApiKey) {
    console.error("[Email] Forge API Key is not configured");
    return false;
  }

  const endpoint = buildEmailEndpointUrl(ENV.forgeApiUrl);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        to: payload.to,
        subject: payload.subject,
        html_content: payload.htmlContent,
        text_content: payload.textContent,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Email] Failed to send email to ${payload.to} (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    console.log(`[Email] Successfully sent email to ${payload.to}`);
    return true;
  } catch (error) {
    console.error("[Email] Error sending email:", error);
    return false;
  }
}
