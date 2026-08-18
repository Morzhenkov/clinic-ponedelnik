// Конфигурация API для статического сайта

// URL Google Apps Script веб-приложения
// ЗАМЕНИТЕ на ваш URL после развертывания скрипта
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwCp32sPf0-vNJ4LErXuB84vCMRC2EDXHZGDCbGfocR7QgvDdhpZarkq9b9g05IcKH1/exec';

// Типы форм с русскими названиями
export const FORM_TYPES = {
  CONSULTATION: 'Получить консультацию',
  TESTIMONIAL_REQUEST: 'Отправить заявку на связь',
  CONTACT: 'Контактная форма'
} as const;

// Функция для отправки данных в Google Sheets
export const submitToGoogleSheets = async (data: {
  name: string;
  phone: string;
  program?: string;
  fileName?: string;
  fileBase64?: string;
  formType: string;
}) => {
  console.log('📤 Отправка данных в Google Sheets:', data);
  console.log('🔗 URL:', GOOGLE_SCRIPT_URL);

  try {
    // Отправляем запрос
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Важно для обхода CORS
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('📨 Запрос отправлен. Статус (no-cors mode):', response.type);

    // При mode: 'no-cors' мы не получим ответ, но запрос уйдет
    return { success: true };
  } catch (error) {
    console.error('❌ Ошибка отправки в Google Sheets:', error);
    return { success: false, error };
  }
};

// Функция для конвертации файла в base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(",")[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
