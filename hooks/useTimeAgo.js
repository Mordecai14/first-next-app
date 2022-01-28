import { useState, useEffect } from "react"

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timeStamp) => {
  const now = Date.now()
  const elapsed = (timeStamp - now) / 1000

  for (const [unit, secondsUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsUnit || unit === "second") {
      const value = Math.floor(elapsed / secondsUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timeStamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timeStamp))

  useEffect(() => {
    const timeOut = setInterval(() => {
      const newTimeAgo = getDateDiffs(timeStamp)
      setTimeAgo(newTimeAgo)
    }, 5000)

    return () => clearInterval(timeOut)
  }, [timeStamp])

  const relativeTImeFormat = new Intl.RelativeTimeFormat(navigator.language, {
    style: "short",
  })
  const { value, unit } = timeAgo

  return relativeTImeFormat.format(value, unit)
}
