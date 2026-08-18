<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as PHPMailerException;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=UTF-8');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function postValue(string $key, int $maxLength): string
{
    $value = isset($_POST[$key]) && is_string($_POST[$key]) ? trim($_POST[$key]) : '';
    if ($value === '' || mb_strlen($value, 'UTF-8') > $maxLength) {
        return '';
    }

    return $value;
}

function configValue(array $config, array $keys, mixed $default = null): mixed
{
    $groups = [$config];
    foreach (['smtp', 'mail', 'mailer'] as $group) {
        if (isset($config[$group]) && is_array($config[$group])) {
            $groups[] = $config[$group];
        }
    }

    foreach ($groups as $values) {
        foreach ($keys as $key) {
            if (array_key_exists($key, $values)) {
                return $values[$key];
            }
        }
    }

    return $default;
}

function escapeHtml(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['success' => false, 'error' => 'Метод запроса не поддерживается.']);
}

$honeypot = isset($_POST['website']) && is_string($_POST['website']) ? trim($_POST['website']) : '';
if ($honeypot !== '') {
    respond(200, ['success' => true]);
}

$name = postValue('name', 120);
$phone = postValue('phone', 40);
$formType = postValue('formType', 120);
$program = postValue('program', 160);

if ($name === '' || $phone === '' || $formType === '') {
    respond(422, ['success' => false, 'error' => 'Заполните имя, телефон и тип заявки.']);
}

$upload = $_FILES['attachment'] ?? null;
$attachmentName = '';
$allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'txt'];
$allowedMimeTypes = [
    'pdf' => ['application/pdf'],
    'doc' => ['application/msword', 'application/octet-stream'],
    'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream'],
    'jpg' => ['image/jpeg'],
    'jpeg' => ['image/jpeg'],
    'png' => ['image/png'],
    'txt' => ['text/plain', 'text/*', 'application/octet-stream'],
];

if (is_array($upload) && (($upload['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE)) {
    $uploadError = (int) ($upload['error'] ?? UPLOAD_ERR_NO_FILE);
    if ($uploadError !== UPLOAD_ERR_OK) {
        respond(400, ['success' => false, 'error' => 'Не удалось принять вложение.']);
    }

    $uploadSize = (int) ($upload['size'] ?? 0);
    $uploadPath = (string) ($upload['tmp_name'] ?? '');
    $originalName = (string) ($upload['name'] ?? '');
    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

    if ($uploadSize <= 0 || $uploadSize > 10 * 1024 * 1024 || !is_uploaded_file($uploadPath) || !in_array($extension, $allowedExtensions, true)) {
        respond(400, ['success' => false, 'error' => 'Недопустимое вложение или превышен размер 10 МБ.']);
    }

    $mimeType = (new finfo(FILEINFO_MIME_TYPE))->file($uploadPath) ?: 'application/octet-stream';
    $mimeAllowed = false;
    foreach ($allowedMimeTypes[$extension] as $allowedMime) {
        if ($allowedMime === $mimeType || ($allowedMime === 'text/*' && str_starts_with($mimeType, 'text/'))) {
            $mimeAllowed = true;
            break;
        }
    }
    if (!$mimeAllowed) {
        respond(400, ['success' => false, 'error' => 'Тип вложения не поддерживается.']);
    }

    $attachmentName = basename($originalName);
}

$projectRoot = dirname(__DIR__, 2);
$autoloadPath = $projectRoot . '/backend/vendor/autoload.php';
$configPath = $projectRoot . '/backend/mail-config.php';

try {
    if (!is_file($autoloadPath) || !is_file($configPath)) {
        throw new RuntimeException('Почтовая конфигурация не настроена.');
    }

    require_once $autoloadPath;
    $loadedConfig = require $configPath;
    $config = is_array($loadedConfig) ? $loadedConfig : [];

    if ($config === []) {
        if (isset($mailConfig) && is_array($mailConfig)) {
            $config = $mailConfig;
        } elseif (isset($configData) && is_array($configData)) {
            $config = $configData;
        }
    }

    $host = configValue($config, ['host', 'smtp_host']);
    $username = configValue($config, ['username', 'user', 'smtp_username', 'smtp_user']);
    $password = configValue($config, ['password', 'pass', 'smtp_password']);
    $port = (int) configValue($config, ['port', 'smtp_port'], 587);
    $encryption = strtolower((string) configValue($config, ['encryption', 'secure', 'smtp_secure'], 'tls'));
    $fromEmail = configValue($config, ['from_email', 'from', 'mail_from']);
    $fromName = (string) configValue($config, ['from_name', 'mail_from_name'], 'Понедельник');
    $recipients = configValue($config, ['recipients', 'to_email', 'to', 'mail_to', 'recipient_email']);

    if (!is_string($host) || $host === '' || !is_string($username) || $username === '' || !is_string($password) || $password === '' || !is_string($fromEmail) || $fromEmail === '' || $recipients === null) {
        throw new RuntimeException('Почтовая конфигурация не настроена.');
    }

    $recipientList = is_array($recipients) ? $recipients : [$recipients];
    $recipientList = array_values(array_filter($recipientList, static fn ($recipient): bool => is_string($recipient) && trim($recipient) !== ''));
    if ($recipientList === []) {
        throw new RuntimeException('Почтовая конфигурация не настроена.');
    }

    $mailer = new PHPMailer(true);
    $mailer->isSMTP();
    $mailer->Host = $host;
    $mailer->SMTPAuth = true;
    $mailer->Username = $username;
    $mailer->Password = $password;
    $mailer->Port = $port;
    $mailer->CharSet = 'UTF-8';
    if (in_array($encryption, ['ssl', 'smtps'], true)) {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($encryption !== '' && $encryption !== 'none') {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }

    $mailer->setFrom($fromEmail, $fromName);
    foreach ($recipientList as $recipient) {
        $mailer->addAddress($recipient);
    }

    $dateTime = date('d.m.Y H:i:s');
    $displayProgram = $program !== '' ? $program : 'Не указана';
    $subject = 'Новая заявка с сайта «Понедельник» — ' . $formType;
    $attachmentLine = $attachmentName !== '' ? "Вложение: {$attachmentName}" : '';
    $textBody = "Новая заявка с сайта ponedelnik.clinic\n\n"
        . "Тип заявки: {$formType}\n"
        . "Имя: {$name}\n"
        . "Телефон: {$phone}\n"
        . "Программа: {$displayProgram}\n"
        . "Дата и время: {$dateTime}\n"
        . ($attachmentLine !== '' ? "{$attachmentLine}\n" : '');

    $mailer->Subject = $subject;
    $mailer->Body = '<h2>Новая заявка с сайта ponedelnik.clinic</h2>'
        . '<p><strong>Тип заявки:</strong> ' . escapeHtml($formType) . '</p>'
        . '<p><strong>Имя:</strong> ' . escapeHtml($name) . '</p>'
        . '<p><strong>Телефон:</strong> ' . escapeHtml($phone) . '</p>'
        . '<p><strong>Программа:</strong> ' . escapeHtml($displayProgram) . '</p>'
        . '<p><strong>Дата и время:</strong> ' . escapeHtml($dateTime) . '</p>'
        . ($attachmentLine !== '' ? '<p><strong>Вложение:</strong> ' . escapeHtml($attachmentName) . '</p>' : '');
    $mailer->AltBody = $textBody;
    $mailer->isHTML(true);

    if ($attachmentName !== '') {
        $mailer->addAttachment((string) $upload['tmp_name'], $attachmentName);
    }

    $mailer->send();
    respond(200, ['success' => true]);
} catch (PHPMailerException | RuntimeException $error) {
    respond(500, ['success' => false, 'error' => 'Не удалось отправить заявку. Попробуйте позже.']);
} catch (Throwable $error) {
    respond(500, ['success' => false, 'error' => 'Не удалось обработать заявку.']);
}
