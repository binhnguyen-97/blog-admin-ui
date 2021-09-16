const emphasisText = (srcString: string, lengthToEmphasis: number) => {
  if (typeof srcString !== 'string') return srcString
  if (!srcString) return ''
  if (srcString.length <= lengthToEmphasis) return srcString

  return srcString.slice(0, lengthToEmphasis - 3) + '...'
}

export default emphasisText
