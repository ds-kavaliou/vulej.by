import { Bot } from 'grammy'

let _bot: Bot | null = null

function getTelegramBot() {
  if (!_bot) {
    const token = process.env.TELEGRAM_BOT_TOKEN
    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN environment variable is not set')
    }

    _bot = new Bot(token)

    _bot.use(async (ctx, next) => {
      const userId = ctx.from?.id
      if (!userId || !hasPermission(ctx.from.id)) {
        return ctx.reply('You are not authorized to use this bot')
      }

      return next()
    })
  }
  return _bot
}

export const bot = new Proxy({} as Bot, {
  get(_target, prop, _receiver) {
    const tgBot = getTelegramBot()
    const value = Reflect.get(tgBot, prop, tgBot)
    if (typeof value === 'function') {
      return value.bind(tgBot)
    }
    return value
  },
})

/** utils */
export function hasPermission(userId: number) {
  const adminIds = process.env.TELEGRAM_ADMIN_IDS?.split(',')

  if (!adminIds || adminIds.length === 0) {
    return false
  }

  return adminIds.includes(userId.toString())
}
