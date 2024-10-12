
// Gets the period of day, returns either "Morning" "Afternoon" or "Evening"
export const getDayPeriod = (): string => {
  const today = new Date()
  const hours = today.getHours()


  if (12 > hours) {
      return 'morning'
  } else if (12 <= hours && 17 > hours) {
      return 'afternoon'
  } else {
      return 'evening'
  }
}