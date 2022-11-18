import moment from "moment";

export const months = [
  "Jan",
  "Feb",
  "Mär",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dez",
];

export const participants = [
  "Fritz",
  "Otto",
  "Joris",
  "Nova",
  "Sabrina",
  "Sascha",
  "Knossi",
];

export const colors = [
  "red",
  "green",
  "#6e00ff",
  "#0077ff",
  "orange",
  "brown",
  "cyan",
];

export const loadChatSettings = (chatSettings) => {
  let fontStyle = "";
  switch (chatSettings.fontStyle) {
    case "Standard":
      fontStyle = "sans-serif";
      break;
    case "Cracked":
      fontStyle = "eroded2";
      break;
    case "Cracked2":
      fontStyle = "header";
      break;
    default:
      break;
  }

  const isDefaultTheme = chatSettings.theme === "Standard";

  return {
    fontStyle,
    isDefaultTheme,
  };
};

export const arrayRankTransform = (favorits) => {
  let votes = [];
  favorits.map((fav) => votes.push(fav.votes?.length));

  const sorted = [...votes].sort((a, b) => b - a);
  const rankArray = votes
    .map((x, i) => ({
      ...favorits[i],
      rank: sorted.indexOf(x) + 1,
    }))
    .sort((itemA, itemB) => {
      if (itemA.rank < itemB.rank) return -1;
      if (itemA.apples > itemB.apples) return 1;

      return 0;
    });
  return rankArray;
};

export function getLastDays(amount) {
  const arr = [...Array(amount).keys()]
    .map((index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);

      return `${date.getFullYear().toString().slice(-2)}-${(
        "0" +
        (date.getMonth() + 1)
      ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
    })
    .reverse();

  return arr;
}

export function getMonthDifference(startDate, endDate) {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

export function loadChartData(dataPeriod, favorits, callback = (_) => {}) {
  const today = new Date();
  const createdAt = new Date(favorits.createdAt);
  const dayDiff = Math.round(
    (today.getTime() - createdAt.getTime()) / (1000 * 3600 * 24)
  );
  const showMonths = dayDiff > 90 && dataPeriod === "total";

  let lineChartLabels = [];

  let lastDays = [];
  let lastIndex = 0;

  switch (dataPeriod) {
    case "7":
      lineChartLabels = getLastDays(7);
      break;
    case "30":
      lastDays = getLastDays(30);
      lastIndex = lastDays.length - 1;
      lineChartLabels = [
        lastDays[0],
        ...lastDays.filter((_, i) => i % 4 === 0 && i !== 0 && i !== lastIndex),
        lastDays[lastIndex],
      ];
      break;
    case "90":
      lastDays = getLastDays(90);
      lastIndex = lastDays.length - 1;
      lineChartLabels = [
        lastDays[0],
        ...lastDays.filter(
          (_, i) => i % 10 === 0 && i !== 0 && i !== lastIndex
        ),
        lastDays[lastIndex],
      ];
      break;
    case "total":
      if (showMonths) {
        const startYear = createdAt.getFullYear().toString().slice(-2);
        const monthDiff = getMonthDifference(createdAt, today) + 1;
        lineChartLabels = [`${months[createdAt.getMonth()]} ${startYear}`];
        let currYear = Number(startYear);
        for (let i = 1; i < monthDiff; i++) {
          const calc = (createdAt.getMonth() + i) % 12;
          lineChartLabels.push(
            `${months[calc]} ${currYear + (calc === 0 ? 1 : 0)}`
          );
          if (calc === 0) currYear++;
        }
      } else {
        lastDays = getLastDays(dayDiff + 1);
        lastIndex = lastDays.length - 1;

        let modulant = 1;
        if (dayDiff > 7) modulant = 3;
        if (dayDiff > 30) modulant = 5;
        if (dayDiff > 50) modulant = 7;
        if (dayDiff > 70) modulant = 10;

        lineChartLabels = [
          lastDays[0],
          ...lastDays.filter(
            (_, i) => i % modulant === 0 && i !== 0 && i !== lastIndex
          ),
          lastDays[lastIndex],
        ];
      }
      break;
    default:
      break;
  }

  const transformToDate = (labels, label, i) => {
    const monthStr = label.split(" ")[0];
    const year = label.split(" ")[1];

    const month = `0${months.findIndex((mon) => mon === monthStr) + 1}`.slice(
      -2
    );

    const isLastLabel = labels.length - 1 === i;

    return isLastLabel
      ? `${today.getFullYear().toString().slice(-2)}-${(
          "0" +
          (today.getMonth() + 1)
        ).slice(-2)}-${("0" + today.getDate()).slice(-2)}`
      : `${year}-${month}`;
  };

  const lineChartDatasets = !favorits?.votes?.length
    ? defaultDatasets
    : favorits?.votes?.map((fav, i) => {
        let votes = lineChartLabels.map((label) => ({ amount: 0, label }));
        lineChartLabels.map((label, i) => {
          const labelDate = moment(
            new Date(
              showMonths ? transformToDate(lineChartLabels, label, i) : label
            )
          );
          fav.votes.map((vote) => {
            const voteDate = moment(vote);
            if (voteDate.isSameOrBefore(labelDate))
              votes = votes.map((voteObj) =>
                voteObj.label === label
                  ? { ...voteObj, amount: voteObj.amount + 1 }
                  : voteObj
              );
          });
        });

        let data = [];
        votes?.length
          ? votes.map((vote) => data.push(vote.amount))
          : (data = lineChartLabels.map((_) => 0));

        return {
          data,
          color: () => colors[i],
          strokeWidth: 2,
        };
      });

  const legend = [];
  lineChartDatasets.length
    ? favorits?.votes?.map((fav) => legend.push(fav.name))
    : participants;

  const barChartDatasets = !favorits?.votes?.length
    ? [0, 0, 0, 0, 0, 0, 0]
    : [];
  favorits?.votes?.map((fav) => barChartDatasets.push(fav?.votes?.length));

  const barChartLabels = !favorits?.votes?.length ? participants : [];
  favorits?.votes?.map((fav) => barChartLabels.push(fav?.name));

  const chartData = {
    lineChart: {
      labels: lineChartLabels,
      datasets: lineChartDatasets,
      legend,
    },
    barChart: {
      labels: barChartLabels,
      datasets: [{ data: barChartDatasets }],
    },
  };

  callback(chartData);

  return chartData;
}
