// Google Apps Script для обработки заявок с сайта
// Развернуть как веб-приложение: Развернуть -> Новое развертывание -> Веб-приложение

// ID вашей Google таблицы (можно получить из URL)
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

function doPost(e) {
  try {
    // Получаем данные из запроса
    const data = JSON.parse(e.postData.contents);
    
    // Открываем таблицу
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Подготавливаем данные для записи
    const timestamp = new Date();
    let fileUrl = '';
    
    // Сохраняем файл в Google Drive, если есть
    if (data.fileBase64 && data.fileName) {
      fileUrl = saveFileToDrive(data.fileBase64, data.fileName, data.name || 'Без имени');
    }
    
    // Записываем данные в строку
    const rowData = [
      timestamp,
      data.name || '',
      data.phone || '',
      data.program || '',
      data.fileName || '',
      fileUrl,
      data.formType || 'consultation'
    ];
    
    sheet.appendRow(rowData);
    
    // Отправляем email уведомление
    sendEmailNotification(data, fileUrl);
    
    // Возвращаем успешный ответ
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Данные сохранены',
        timestamp: timestamp.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Ошибка:', error);
    
    // Возвращаем ошибку
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        message: 'Произошла ошибка при сохранении данных'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveFileToDrive(base64Data, fileName, clientName) {
  try {
    // Декодируем base64
    const byteCharacters = Utilities.base64Decode(base64Data);
    const blob = Utilities.newBlob(byteCharacters, 'application/octet-stream', fileName);
    
    // Ищем папку "projects/Клиника Понедельник/Вложения"
    // Разделяем путь на части
    const pathParts = ['projects', 'Клиника Понедельник', 'Вложения'];
    
    let currentFolder = DriveApp.getRootFolder();
    
    // Проходим по каждой части пути
    for (let i = 0; i < pathParts.length; i++) {
      const folderName = pathParts[i];
      const folders = currentFolder.getFoldersByName(folderName);
      
      if (folders.hasNext()) {
        currentFolder = folders.next();
      } else {
        // Если папки нет, создаем её
        currentFolder = currentFolder.createFolder(folderName);
      }
    }
    
    // Теперь currentFolder - это папка "Вложения"
    // Создаем подпапку по дате (год-месяц)
    const date = new Date();
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    let monthFolder;
    
    const monthFolders = currentFolder.getFoldersByName(yearMonth);
    if (monthFolders.hasNext()) {
      monthFolder = monthFolders.next();
    } else {
      monthFolder = currentFolder.createFolder(yearMonth);
    }
    
    // Создаем подпапку по дню
    const day = String(date.getDate()).padStart(2, '0');
    let dayFolder;
    
    const dayFolders = monthFolder.getFoldersByName(day);
    if (dayFolders.hasNext()) {
      dayFolder = dayFolders.next();
    } else {
      dayFolder = monthFolder.createFolder(day);
    }
    
    // Генерируем безопасное имя файла
    const safeFileName = `${date.getHours()}${date.getMinutes()}_${fileName.replace(/[^\w\.\-]/g, '_')}`;
    
    // Сохраняем файл
    const file = dayFolder.createFile(blob);
    file.setName(safeFileName);
    
    // Даем доступ по ссылке
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return file.getUrl();
    
  } catch (error) {
    console.error('Ошибка сохранения файла:', error);
    return '';
  }
}

function sendEmailNotification(data, fileUrl) {
  try {
    // Настройте email получателя
    const recipient = 'ваш-email@gmail.com'; // ЗАМЕНИТЕ на ваш email
    
    const subject = `📋 Новая заявка с сайта: ${data.name || 'Без имени'}`;
    
    let body = `
Новая заявка с сайта "Понедельник"

👤 Имя: ${data.name || 'Не указано'}
📞 Телефон: ${data.phone || 'Не указано'}
📋 Программа: ${data.program || 'Не указана'}
🏷️ Тип формы: ${data.formType || 'consultation'}

📎 Файл: ${data.fileName || 'Не прикреплен'}
🔗 Ссылка на файл: ${fileUrl || 'Нет'}

⏰ Дата: ${new Date().toLocaleString('ru-RU')}

📁 Файл сохранен в: projects/Клиника Понедельник/Вложения/

---
Это автоматическое уведомление с сайта clinic-ponedelnik.
`;
    
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: body
    });
    
  } catch (error) {
    console.error('Ошибка отправки email:', error);
  }
}

// Функция для тестирования (GET запрос)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'API работает',
      timestamp: new Date().toISOString(),
      instructions: 'Используйте POST запрос с JSON данными'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Вспомогательная функция для настройки структуры папок
function setup() {
  // Создаем структуру папок projects/Клиника Понедельник/Вложения
  const pathParts = ['projects', 'Клиника Понедельник', 'Вложения'];
  
  let currentFolder = DriveApp.getRootFolder();
  
  for (let i = 0; i < pathParts.length; i++) {
    const folderName = pathParts[i];
    const folders = currentFolder.getFoldersByName(folderName);
    
    if (folders.hasNext()) {
      currentFolder = folders.next();
      console.log('Папка уже существует:', folderName);
    } else {
      currentFolder = currentFolder.createFolder(folderName);
      console.log('Папка создана:', folderName);
    }
  }
  
  console.log('Настройка структуры папок завершена');
  console.log('Путь: projects/Клиника Понедельник/Вложения');
}
