export const hasPermission = (userId: number) => {
  const adminIds = process.env.TELEGRAM_ADMIN_IDS?.split(',')

  if (!adminIds || adminIds.length === 0) {
    return false
  }

  return adminIds.includes(userId.toString())
}
