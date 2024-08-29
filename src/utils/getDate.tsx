
// Gets current date in "day, month date" formatt
export const getCurrentDate = (): string => {
  const today = new Date();
  
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = monthsOfYear[today.getMonth()];
  const date = today.getDate();
  
  return `${dayOfWeek}, ${month} ${date}`;
};

// Gets the period of day, returns either "Morning" "Afternoon" or "Evening"
export const getDayPeriod = (): string => {
  const today = new Date()
  const hours = String(today.getHours()).padStart(2, '0');


  if ('12' > hours) {
      return 'morning'
  } else if ('12' < hours && '17' > hours) {
      return 'afternoon'
  } else {
      return 'evening'
  }
}