export const exFn_1 = (): string => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()

  return year + '/' + month + '/' + date
}
