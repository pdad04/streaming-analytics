const dataForge = require("data-forge");
require("data-forge-fs");
const { DateTime } = require("luxon");
const fs = require("fs");
const path = require("path");
const convertTimeString = require("../utils/convertToSeconds");

const netflixUpload = async (file, timeZone) => {
  const filePath = path.resolve("tmp/uploads", file);
  const dataFrame = await dataForge.readFile(filePath).parseCSV();
  const requiredColumns = ["Profile Name", "Start Time", "Duration", "Title"];

  if (requiredColumns.every(el => dataFrame.getColumnNames().includes(el))) {
    // Filter the data frame to exclude rows with a duration < 1 minute
    // Also only include rows that have no supplemental video type.
    const filteredDF = dataFrame.where(row => {
      const seconds = convertTimeString(row["Duration"]);
      return row["Supplemental Video Type"] === "" && seconds > 60;
    });

    // Get a data frame for each profile in the list
    const profiles = filteredDF.groupBy(row => row["Profile Name"]).toArray();

    fs.unlinkSync(filePath);
    return calculateStats(filteredDF, profiles, timeZone);
  } else {
    fs.unlinkSync(filePath);
    throw new Error(
      `File is missing at least one of the required columns: ${requiredColumns.join(
        ", "
      )}.`
    );
  }
};

const calculateStats = (allDataFrames, dataFrameGroups, timeZone) => {
  const data = [];
  let stats = {};

  /**
   * Calculates the total viewing time
   * @param {Object} Dataframe - Data forge data frame
   * @returns {Number}           Summation of duration for the data frame
   */
  const calculateDuration = dataFrame => {
    // const duration = [];
    // duration.push(
    //   dataFrame.reduce((accum, row) => {
    //     seconds = convertTimeString(row["Duration"]);
    //     return accum + seconds;
    //   }, 0)
    // );
    // console.log("data", data[0]?.profileViewingTime[0] ?? "Hello");
    // console.log("duration", duration);
    // duration.push(
    //   duration[0] / (data[0]?.profileViewingTime[0] ?? duration[0])
    // );
    // return duration;
    return dataFrame.reduce((accum, row) => {
      seconds = convertTimeString(row["Duration"]);
      return accum + seconds;
    }, 0);
  };

  /**
   * @param {Object} Dataframe - Data forge data frame.
   * @return {Array}             Array where each index reprsents an hour of the day
   **/
  const activityPerHour = dataFrame => {
    const hoursOfDay = new Array(24).fill(0);

    dataFrame.forEach(row => {
      const date = new Date(row["Start Time"] + " UTC");
      const startTime = DateTime.fromJSDate(date).setZone(timeZone).hour;

      // Start time will be 0 -23 so add one to hoursOfDay index
      hoursOfDay[startTime]++;
    });
    return hoursOfDay;
  };

  /**
   * Get the most watched title
   * @param   {Object} Dataframe - Data forge data frame.
   * @returns {Array}              Array Title of show and number of entries of the show title.
   */
  const getMostWatched = dataFrame => {
    const shows = new Map();
    const mostWatched = ["", 0];

    dataFrame.forEach(row => {
      const [title] = row.Title.split(":");

      shows.has(title)
        ? shows.set(title, shows.get(title) + 1)
        : shows.set(title, 1);
    });

    shows.forEach((value, key) => {
      if (value > mostWatched[1]) {
        mostWatched[0] = key;
        mostWatched[1] = value;
      }
    });
    return mostWatched;
  };

  /**
   * Counts number of viewings for each day of the week.
   * @param {Object} Dataframe - Dataforge data frame
   * @returns {Array}            Array where each index represents day of week 0=Monday 6=Sunday
   */
  const activityPerDay = dataFrame => {
    const daysOfWeekCounts = new Array(7).fill(0);

    dataFrame.forEach(row => {
      const date = new Date(row["Start Time"] + " UTC");
      const dayOfWeek = DateTime.fromJSDate(date).setZone(timeZone).weekday;

      // 1 = Monday, 7 = Sunday
      switch (dayOfWeek) {
        case 1:
          daysOfWeekCounts[0]++;
          break;
        case 2:
          daysOfWeekCounts[1]++;
          break;
        case 3:
          daysOfWeekCounts[2]++;
          break;
        case 4:
          daysOfWeekCounts[3]++;
          break;
        case 5:
          daysOfWeekCounts[4]++;
        case 6:
          daysOfWeekCounts[5]++;
          break;
        case 7:
          daysOfWeekCounts[6]++;
          break;
      }
    });
    return daysOfWeekCounts;
  };

  stats.profileName = "all";
  stats.profileViewingTime = calculateDuration(allDataFrames);
  stats.mostViewedTitle = getMostWatched(allDataFrames);
  stats.viewingDays = activityPerDay(allDataFrames);
  stats.profileViewingHours = activityPerHour(allDataFrames);
  stats.allProfileViewingDurations = [];
  data.push(stats);

  dataFrameGroups.forEach(df => {
    stats = {};
    stats.profileName = df.head(1).bake().content.values[0]["Profile Name"];
    stats.profileViewingTime = calculateDuration(df);
    stats.profileViewingHours = activityPerHour(df);
    stats.mostViewedTitle = getMostWatched(df);
    stats.viewingDays = activityPerDay(df);
    data.push(stats);
    data[0]["allProfileViewingDurations"].push({
      profileName: stats.profileName,
      profileViewingTime: stats.profileViewingTime,
    });
  });

  return data;
};

module.exports = netflixUpload;
