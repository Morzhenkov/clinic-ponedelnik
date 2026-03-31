import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendEmail } from "./_core/email";

// Mock the fetch function
global.fetch = vi.fn();

describe("Email Sending", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should send email with correct payload structure", async () => {
    // Mock successful email response
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      text: async () => "",
    });

    const result = await sendEmail({
      to: "info@ponedelnik.clinic",
      subject: "Test Subject",
      htmlContent: "<h1>Test</h1>",
      textContent: "Test",
    });

    expect(result).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const callArgs = (global.fetch as any).mock.calls[0];
    const body = JSON.parse(callArgs[1].body);

    expect(body.to).toBe("info@ponedelnik.clinic");
    expect(body.subject).toBe("Test Subject");
    expect(body.html_content).toBe("<h1>Test</h1>");
    expect(body.text_content).toBe("Test");
  });

  it("should return false when email service is unavailable", async () => {
    // Mock failed email response
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: async () => "Service unavailable",
    });

    const result = await sendEmail({
      to: "info@ponedelnik.clinic",
      subject: "Test Subject",
      htmlContent: "<h1>Test</h1>",
    });

    expect(result).toBe(false);
  });

  it("should return false when network error occurs", async () => {
    // Mock network error
    (global.fetch as any).mockRejectedValueOnce(new Error("Network error"));

    const result = await sendEmail({
      to: "info@ponedelnik.clinic",
      subject: "Test Subject",
      htmlContent: "<h1>Test</h1>",
    });

    expect(result).toBe(false);
  });

  it("should include all consultation details in email", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      text: async () => "",
    });

    const consultationData = {
      name: "Иван Петров",
      phone: "+7 (915) 066-05-53",
      program: "Новый понедельник",
    };

    const htmlContent = `
      <h2>Новая заявка на консультацию</h2>
      <p><strong>Имя:</strong> ${consultationData.name}</p>
      <p><strong>Телефон:</strong> ${consultationData.phone}</p>
      <p><strong>Программа:</strong> ${consultationData.program}</p>
    `;

    const result = await sendEmail({
      to: "info@ponedelnik.clinic",
      subject: `Новая заявка на консультацию от ${consultationData.name}`,
      htmlContent,
    });

    expect(result).toBe(true);

    const callArgs = (global.fetch as any).mock.calls[0];
    const body = JSON.parse(callArgs[1].body);

    expect(body.html_content).toContain(consultationData.name);
    expect(body.html_content).toContain(consultationData.phone);
    expect(body.html_content).toContain(consultationData.program);
  });
});
