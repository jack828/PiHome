
const formatDuration = (start, end) => {
  const SECONDS = 1 * 1000
  const MINUTES = 60 * SECONDS
  const HOURS = 60 * MINUTES
  const DAYS = 24 * HOURS
  const duration = start - end // in ms

  const days = Math.floor(duration / DAYS)
  const hours = Math.floor((duration % DAYS) / HOURS)
  const minutes = Math.floor((duration % HOURS) / MINUTES)
  const seconds = Math.floor((duration % MINUTES) / SECONDS)

  const format = (amount, label) => `${amount > 0 ? `${amount}${label} ` : ''}`
  return (
    format(days, 'd') +
    format(hours, 'h') +
    format(minutes, 'm') +
    format(seconds, 's')
  )
}

export default formatDuration
