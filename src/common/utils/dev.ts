/**
 * Utils that are used ONLY during development
 */

export const delay = async (ms: number = 3000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
