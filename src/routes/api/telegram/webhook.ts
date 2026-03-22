import { createFileRoute } from '@tanstack/react-router'
import { bot } from '@/server/telegram'

export const Route = createFileRoute('/api/telegram/webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = request.headers.get('x-telegram-bot-api-secret-token')

        if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
          return new Response('Unauthorized', { status: 401 })
        }

        const update = await request.json()
        await bot.handleUpdate(update)

        return new Response('ok')
      },
    },
  },
})
