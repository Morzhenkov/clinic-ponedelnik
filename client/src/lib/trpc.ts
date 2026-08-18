// TRPC больше не используется в статическом сайте
// Создаем заглушку для совместимости
export const trpc = {
  consultations: {
    submit: {
      useMutation: () => ({
        mutateAsync: async () => {
          // Имитация успешной отправки
          return Promise.resolve();
        },
        isPending: false,
        isError: false,
        error: null,
        isSuccess: false,
        data: null,
        variables: null,
        context: null,
        reset: () => {},
        status: 'idle',
      }),
    },
  },
} as any;
