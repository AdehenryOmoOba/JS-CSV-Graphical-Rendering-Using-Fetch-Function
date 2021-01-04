chartIt();
async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById("chart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xs,
      datasets: [
        {
          fill: "false",
          label:
            "Combined Land-Surface Air and Sea-Surface Water Temperature in °C (Degree Celcius)",
          data: data.ys,
          backgroundColor: "yellow",
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value, index, values) {
                return value + "°C";
              },
            },
          },
        ],
      },
    },
  });
}

async function getData() {
  const xs = [];
  const ys = [];

  const response = await fetch("ZonAnn.Ts+dSST.csv");
  const data = await response.text();
  //   console.log(data);
  const table = data.split("\n").slice(1);
  //   console.log(rows);
  table.forEach((rows) => {
    const columns = rows.split(",");
    const year = columns[0];
    const temp = columns[1];
    xs.push(year);
    ys.push(parseFloat(temp) + 14);
    console.log(year, temp);
  });
  return { xs, ys };
}
