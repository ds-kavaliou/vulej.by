import { bot } from '@/common/lib'

const CHAT_ID = process.env.TELEGRAM_CHAT_ID

type SendTelegramResult =
  | { success: true }
  | { success: false; error?: unknown }

export async function sendMessageToTelegramChat(
  message: string,
): Promise<SendTelegramResult> {
  if (!CHAT_ID) {
    throw new Error('TELEGRAM_CHAT_ID environment variable is not set')
  }

  try {
    const result = await bot.api.sendMessage(CHAT_ID, message, {
      parse_mode: 'HTML',
    })

    return { success: Boolean(result.message_id) }
  } catch (error) {
    console.error('Telegram send error:', error)
    return { success: false, error }
  }
}
