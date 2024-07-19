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