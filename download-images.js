import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { HttpsProxyAgent } from 'https-proxy-agent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = {
  ivPatient: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/lpIjVeIoDTAQVIOG.webp",
  doctorOffice: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/TKhJXPaJQWNGgEiB.jpg",
  doctorConsultation: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/bWASYmIdwgwIxoIl.png",
  ivDrip: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/kOaBnZlFOmHjIGDc.png",
  recliners: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/ZIcdmlMlVmVhLyZD.jpg",
  receptionLogo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/AgaouaSNjfmrDGbN.jpg",
  receptionDesk: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/iNJVkdeepDsPpcDN.jpg",
  waitingArea: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/xBiIIyOqnOdmPTVU.jpg",
  logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/YmfaYcSJobutlROw.jpg",
  logoCircle: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/LmXzAEntIIRgShGK.png",
  logoCircleLight: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/LmXzAEntIIRgShGK.png",
  heroGenerated: "https://d2xsxph8kpxj0f.cloudfront.net/310519663096993096/hdtQvaxiWb9W7weDTCV6tP/iv-therapy-procedure-HrfhGSzZrzp7Ymjgf9SXUg.webp",
  wellnessResults: "https://d2xsxph8kpxj0f.cloudfront.net/310519663096993096/hdtQvaxiWb9W7weDTCV6tP/wellness-results-CCDrWAnx4WMRuRR4bDSn54.webp",
  transformationSequence: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/RefjzjSMLELhxutl.PNG",
  heroBackground: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/UlMMUYuPeugTFMXq.PNG",
  results1: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/SohOikkoRfqNVvXJ.jpg",
  results2: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/rscHNCjsmILdRngU.jpg",
  resultsMobile1: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/onfaxAicWJWqkGsg.jpg",
  resultsMobile2: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/ZsZiAXgFQxEWPXNa.jpg",
  resultsTablet1: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/QnzGtLmrDqkLIppq.jpg",
  resultsTablet2: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/uJabHgjSMXfzuZWP.jpg",
  formBackground: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/fEvVmzzKUNjGHVAp.png",
  logoNav: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/eFjoSEfsOJNdgKDH.svg",
  logoFooter: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/lZBYIAbLnvciebLy.png",
  favicon: "https://clinicweight-hdtqvaxi.manus.space/favicon.ico"
};

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const dir = path.join(__dirname, 'client', 'public', 'images');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filepath = path.join(dir, filename);
    const file = fs.createWriteStream(filepath);

    // Функция для попытки скачивания
    const tryDownload = async (useProxy) => {
      const options = {
        hostname: new URL(url).hostname,
        port: 443,
        path: new URL(url).pathname + new URL(url).search,
        method: 'GET'
      };

      if (useProxy) {
        try {
          const proxyAgent = new HttpsProxyAgent('http://127.0.0.1:12334');
          options.agent = proxyAgent;
          console.log(`  Используем прокси для ${filename}`);
        } catch (error) {
          console.log(`  Не удалось создать прокси-агент для ${filename}: ${error.message}`);
        }
      }

      const req = https.request(options, (response) => {
        // Проверяем статус ответа
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
          return;
        }

        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Скачано: ${filename} ${useProxy ? '(через прокси)' : '(прямое соединение)'}`);
          resolve();
        });
      }).on('error', (err) => {
        if (useProxy) {
          console.log(`  Прокси не сработал для ${filename}, пробуем прямое соединение: ${err.message}`);
          // Пробуем без прокси
          tryDownload(false).catch(reject);
        } else {
          fs.unlink(filepath, () => {});
          console.error(`❌ Ошибка при скачивании ${filename}:`, err.message);
          reject(err);
        }
      });

      req.end();
    };

    // Начинаем с попытки через прокси
    tryDownload(true).catch(reject);
  });
};

async function downloadAll() {
  console.log('Начинаем скачивание изображений...');
  console.log('Используем прокси: http://127.0.0.1:12334');

  const promises = [];
  for (const [key, url] of Object.entries(images)) {
    // Извлекаем расширение из URL или используем .jpg по умолчанию
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const extension = path.extname(pathname) || '.jpg';
    const filename = `${key}${extension}`;

    promises.push(
      downloadImage(url, filename)
        .catch(error => {
          console.log(`⚠️ Пропускаем ${key}: ${error.message}`);
          return null;
        })
    );
  }

  await Promise.all(promises);

  console.log('Скачивание завершено!');
  console.log('Изображения сохранены в client/public/images/');
}

downloadAll().catch(console.error);
