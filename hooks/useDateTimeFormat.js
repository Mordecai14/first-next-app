const useDateTimeFormat = (timestamp) => {
  const date = new Date(timestamp)
  const language = "es-MX"

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }

  return new Intl.DateTimeFormat(language, options).format(date)
}

export default useDateTimeFormat
