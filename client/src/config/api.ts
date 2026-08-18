// API для форм статического сайта.

export const FORM_TYPES = {
  CONSULTATION: 'Получить консультацию',
  TESTIMONIAL_REQUEST: 'Отправить заявку на связь',
  CONTACT: 'Контактная форма',
} as const;

type SubmitFormResult = {
  success: boolean;
  error?: string;
};

const DEFAULT_ERROR_MESSAGE = 'Ошибка при отправке заявки. Пожалуйста, попробуйте снова.';

export const submitForm = async (data: FormData): Promise<SubmitFormResult> => {
  try {
    const response = await fetch('/api/send-form.php', {
      method: 'POST',
      body: data,
    });

    let result: unknown;
    try {
      result = await response.json();
    } catch {
      return { success: false, error: DEFAULT_ERROR_MESSAGE };
    }

    if (!response.ok || !result || typeof result !== 'object' || !('success' in result) || result.success !== true) {
      return {
        success: false,
        error:
          result && typeof result === 'object' && 'error' in result && typeof result.error === 'string'
            ? result.error
            : DEFAULT_ERROR_MESSAGE,
      };
    }

    return { success: true };
  } catch {
    return { success: false, error: DEFAULT_ERROR_MESSAGE };
  }
};
