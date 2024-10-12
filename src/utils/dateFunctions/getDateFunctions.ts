
export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const monthsOfYear = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Gets current date in "day, month date" formatt
export const getCurrentDateDisplay = (): string => {
  const today = new Date();
  
  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = monthsOfYear[today.getMonth()];
  const date = today.getDate();
  
  return `${dayOfWeek}, ${month} ${date}`;
};

// Returns the number of days in a month
export const getDaysInMonth = (inputDate?: Date) => {
  const currentDate = inputDate || new Date();
  return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
};

// Returns the first day of the month
export const getFirstDayOfMonth = (inputDate?: Date) => {
  const currentDate = inputDate || new Date();
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
};

// Returns the start of the week
export const getStartOfWeek = (calendarDate?: Date) => {
  const date = calendarDate || new Date();
  const dayOfWeek = date.getDay()
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - dayOfWeek);
  return startOfWeek;
};