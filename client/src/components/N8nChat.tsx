import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

export default function N8nChat() {
  useEffect(() => {
    const chat = createChat({
      webhookUrl: 'https://example.com/webhook',
      mode: 'window',
      showWelcomeScreen: true,
      initialMessages: ['Здравствуйте! Чем могу помочь?'],
      i18n: {
        en: {
          title: 'Чат поддержки',
          subtitle: 'Задайте вопрос',
          footer: '',
          getStarted: 'Начать чат',
          inputPlaceholder: 'Введите сообщение...',
          closeButtonTooltip: 'Закрыть',
        },
      },
      // enableStreaming: true,
    });

    return () => {
      // cleanup if needed
      chat?.unmount?.();
    };
  }, []);

  return null;
}
