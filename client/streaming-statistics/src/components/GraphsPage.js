import React from "react";
import { useStyletron } from "baseui";
import { HeadingMedium } from "baseui/typography";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { flexGridItemMediaQueryStyle } from "baseui/flex-grid/flex-grid-item";

// ChartJS config
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Days",
    },
  },
};

const labels = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

function GraphsPage({ data }) {
  console.log(data);
  const [css] = useStyletron();

  const convertFromSeconds = seconds => {
    // Number of seconds in day, hour, minute
    const year = 31540000;
    const day = 86400;
    const hour = 3600;
    const minute = 60;

    if (seconds > 31540000) {
      const years = Math.floor(seconds / year);
      const days = Math.floor((seconds % year) / day);
      const hours = Math.floor((seconds % day) / hour);
      const minutes = Math.floor((seconds % hour) / minute);
      const sec = Math.floor(seconds % minute);

      return `${years}Y : ${days}D : ${hours}H : ${minutes}M : ${sec}S`;
    }

    const days = Math.floor(seconds / day);
    const hours = Math.floor((seconds - days * day) / hour);
    const minutes = Math.floor((seconds - days * day - hours * hour) / minute);
    const sec = seconds - days * day - hours * hour - minutes * minute;

    return `${days}D : ${hours}H : ${minutes}M : ${sec}S`;
  };

  const graphLayout = {
    position: "relative",
    height: "10vh",
  };

  return (
    <div className={css({ width: "100vw", height: "100vh" })}>
      <div
        className={css({
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          columnGap: "1.5rem",
          rowGap: "10rem",
          padding: "3rem",
        })}
      >
        {data.map(profile => {
          return (
            <div className={css({ marginBottom: "0" })}>
              <div
                className={css({ textAlign: "center", marginBottom: "1rem" })}
              >
                <HeadingMedium>
                  {profile.profileName.toUpperCase()}
                </HeadingMedium>
              </div>
              <div
                className={css({
                  width: "100%",
                  height: "100%",
                  // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  borderRadius: "0.5rem",
                  padding: "2em",
                })}
              >
                <div
                  className={css({
                    textAlign: "center",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "1.75rem",
                    fontWeight: "400",
                  })}
                >
                  Most Watched:{" "}
                  <span className={css({ fontWeight: "300" })}>
                    {profile.mostViewedTitle[0]}
                  </span>
                </div>
                <div
                  className={css({
                    textAlign: "center",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "1.75rem",
                    fontWeight: "400",
                    marginTop: "1em",
                  })}
                >
                  Total Viewing Time:{" "}
                  <span className={css({ fontWeight: "300" })}>
                    {convertFromSeconds(profile.profileViewingTime)}
                  </span>
                </div>
                <div
                  className={css({
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    alignItems: "center",
                    marginTop: "2rem",
                  })}
                >
                  <div>
                    <Bar
                      data={{
                        labels: labels,
                        datasets: [
                          {
                            label: "Viewing By Day",
                            backgroundColor: "rgba(63, 146, 200, 0.79)",
                            data: profile.viewingDays,
                          },
                        ],
                      }}
                    />
                  </div>
                  {profile.allProfileViewingDurations ? (
                    <div>
                      <Pie
                        data={{
                          labels: profile.allProfileViewingDurations.map(
                            el => el.profileName
                          ),
                          datasets: [
                            {
                              label: "Test",
                              data: profile.allProfileViewingDurations.map(
                                el =>
                                  (el.profileViewingTime /
                                    profile.profileViewingTime) *
                                  100
                              ),
                              backgroundColor: [
                                "rgba(2, 71, 181,0.75)",
                                "rgba(2, 71, 35,0.75)",
                              ],
                            },
                          ],
                        }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GraphsPage;
