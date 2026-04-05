import { Bot } from 'grammy'
import { hasPermission } from './telegram.config'

const token = process.env.TELEGRAM_BOT_TOKEN

if (!token) {
  throw new Error('Missing TELEGRAM_BOT_TOKEN')
}

export const bot = new Bot(token)

bot.use(async (ctx, next) => {
  const userId = ctx.from?.id
  if (!userId || !hasPermission(ctx.from.id)) {
    return ctx.reply('You are not authorized to use this bot')
  }

  return next()
})
