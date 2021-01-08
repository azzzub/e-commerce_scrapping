const charLimiting = (text: string, limit?: number) => {
  const count = limit ?? 42
  return text.slice(0, count) + (text.length > count ? '...' : '')
}

export default charLimiting
