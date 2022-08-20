/**
 * Convert time from HH:MM:SS to seconds
 * @param   {String} timeString Time string in HH:MM:SS format
 * @returns {Number}            The time in seconds
 */
const convertToSeconds = (timeString) => {
  const [hr,min,sec] = timeString.split(":");
  return parseInt(hr,10) * 60  * 60 + parseInt(min, 10) * 60 + parseInt(sec, 10);
}

module.exports = convertToSeconds;