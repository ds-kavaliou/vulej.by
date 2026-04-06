import { bot } from '@/common/lib'

const CHAT_ID = process.env.TELEGRAM_CHAT_TOKEN

export const sendMessageToTelegramChat = (message: string) => {
  if (!CHAT_ID) {
    throw new Error('TELEGRAM_CHAT_ID environment variable is not set')
  }

  return bot.api.sendMessage(CHAT_ID, message, { parse_mode: 'HTML' })
}
