// Created by Anna McColl on 25th April 2023
// To convert date objects into readable strings.

function DateFormatConverter(date) {
  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const theDate = new Date(date);
  const theMonth = theDate.getMonth();
  
  return (theDate.getDate() + " " + Months[theMonth] +" " + theDate.getFullYear());
}

export default DateFormatConverter;
