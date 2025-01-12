export const barChartDataDailyTraffic = [
  {
    name: "Daily Traffic",
    data: [20, 30, 40, 20, 45, 50, 30],
  },
];

export const barChartOptionsDailyTraffic = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000"
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["00", "04", "08", "12", "14", "16", "18"],
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: "#4318FF",
            opacity: 1,
          },
          {
            offset: 100,
            color: "rgba(67, 24, 255, 1)",
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "40px",
    },
  },
};

export const pieChartOptions = {
  labels: ["Your files", "System", "Empty"],
  colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
  chart: {
    width: "50px",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000"
    },
  },
};

export const pieChartData = [63, 25, 12];

export function updateChartData(graphCategory) {
  barChartDataWeeklyRevenue[0].data = Array(barChartOptionsWeeklyRevenue.xaxis.categories.length).fill(0);
  barChartDataWeeklyRevenue[1].data = Array(barChartOptionsWeeklyRevenue.xaxis.categories.length).fill(0);
  console.log(barChartOptionsWeeklyRevenue.xaxis.categories, "this is my graphcategory"); 
  console.log(barChartDataWeeklyRevenue, "first..............................");
  graphCategory.forEach(element => {
   

    let position = barChartOptionsWeeklyRevenue.xaxis.categories.indexOf(element.categoryName);
    console.log(position, "postition no", element.categoryName);
    barChartDataWeeklyRevenue[1].data[position] = element.totalAmount
    barChartDataWeeklyRevenue[0].data[position] = element.totalBookings

  })
  console.log(barChartDataWeeklyRevenue,"last..............................");
  return barChartDataWeeklyRevenue

}

export const barChartDataWeeklyRevenue = [
  {
    name: "Bookings",
    data: [],
    color: "#6AD2Fa",
  },
  {
    name: "Revenue",
    data: [],
    color: "#4318FF",
  },
];


// export const barChartDataWeeklyRevenue = [
//   {
//     name: "salest",
//     data: [400, 370, 330, 390, ],
//     color: "#6AD2Fa",
//   },
//   {
//     name: "PRODUCT B",
//     data: [400, 370, 330, 390],
//     color: "#4318FF",
//   },
//   {
//     name: "PRODUCT C",
//     data: [400, 370, 330, 390],
//     color: "#EFF4FB",
//   },
// ];



export function setcategories(categories) {
  barChartOptionsWeeklyRevenue.xaxis.categories = categories
}
export const barChartOptionsWeeklyRevenue = {
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  // colors:['#ff3322','#faf']
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000"
    },
    theme: 'dark',
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
  },
  xaxis: {
    categories: ["apartment", "home", "tree", "beach",],
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: false,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },

  grid: {
    borderColor: "rgba(163, 174, 208, 0.3)",
    show: true,
    yaxis: {
      lines: {
        show: false,
        opacity: 0.5,
      },
    },
    row: {
      opacity: 0.5,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "solid",
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
  },
  legend: {
    show: false,
  },
  colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "20px",
    },
  },
};



export const lineChartDataTotalSpent = [
  {
    name: "Revenue",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    color: "#4318FF",
  },
  {
    name: "Bookings",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    color: "#6AD2FF",
  },
];

export function manipulatelineChartDataTotalSpent(graphData) {

  graphData.forEach(element => {
    const monthIndex = element._id.month - 1;
    if (monthIndex >= 0 && monthIndex < lineChartDataTotalSpent[0].data.length) {
      lineChartDataTotalSpent[0].data[monthIndex] = element.totalAmount;
      lineChartDataTotalSpent[1].data[monthIndex] = element.count;
    }
  });

  return lineChartDataTotalSpent
}

export const lineChartOptionsTotalSpent = {
  legend: {
    show: false,
  },

  theme: {
    mode: "light",
  },
  chart: {
    type: "line",

    toolbar: {
      show: false,
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },

  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000"
    },
    theme: 'dark',
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
  grid: {
    show: false,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    type: "text",
    range: undefined,
    categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  },

  yaxis: {
    show: false,
  },
};


