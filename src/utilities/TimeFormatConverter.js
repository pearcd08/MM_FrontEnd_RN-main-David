// Created by Anna McColl on 14th May 2023
// To convert datetime objects into readable strings.

function TimeFormatConverter(dateTime) {
  const timeZoneOptions = {
    timeZone: "Pacific/Auckland",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };
  const formattedTime = new Date(dateTime).toLocaleString(
    "en-NZ",
    timeZoneOptions
  );

  return formattedTime;
}

export default TimeFormatConverter;
