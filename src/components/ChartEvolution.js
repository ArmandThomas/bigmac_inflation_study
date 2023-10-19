import Chart from 'react-apexcharts'
import {useEffect, useState} from "react";
import {URL} from "../utils";

const ChartEvolution = () => {

  const [data, setData] = useState([]);

  const getData = async () => {
    const reqData = await fetch(`${URL}/data`);
    const resData = await reqData.json();

    const reqMcdo = await fetch(`${URL}/mcdo`);
    const resMcdo = await reqMcdo.json();

    const localRes = [];

    if (resData.length > 0) {
      resData.forEach((row) => {
        const [found] = resMcdo.filter(d => d['Year'] === row['Year']);
        if (found) {
          localRes.push({
            ...found,
            ...row
          })
        }
      });

      setData(localRes);
    }

  }

  useEffect(() => {
    getData();
  }, []);

  const series = [
    {
      name: "BigMac Price",
      type: "line",
      data: data.map(d => d['dollar_price_avg'])
    },
    {
      name: "Inflation",
      type: "line",
      data: data.map(d => d['inflation_value_sum'].toFixed(1))
    },
    {
      name: "McDonalds Revenue",
      type: "column",
      data: data.map(d => d['McDonalds_Revenue'])
    },

  ];

  const options = {
    chart: {
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: [4, 4, 4]
    },
    title: {
      text: 'BigMac Price & Inflation Evolution & McDonalds Revenue',
      align: 'left',
      offsetX: 110
    },
    xaxis: {
      categories: data.map(d => d['Year']),
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        labels: {
          style: {
            colors: '#008FFB',
            fontSize: '16px'
          },
          formatter: function (value) {
            return Math.round(value).toFixed(2) + "$";
          }
        },
        title: {
          text: "BigMac Price",
          style: {
            color: '#008FFB',
          }
        },
        tooltip: {
          enabled: true
        }
      },
      {
        seriesName: 'Inflation',
        opposite: false,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396'
        },
        labels: {
          style: {
            colors: '#00E396',
            fontSize: '16px'
          },
          formatter: function (value) {
            return value.toFixed(1) + "%";
          }
        },
        title: {
          text: "Inflation in %",
          style: {
            color: '#00E396',
          }
        }
      },
      {
        seriesName: 'McDonalds Revenue',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        labels: {
          style: {
            colors: '#FEB019',
            fontSize: '16px'
          },
          formatter: function (value) {
            return (value / 1000000000).toFixed(2) + "B$";
          }
        }
      }
    ],
    legend: {
      horizontalAlign: 'left',
      offsetX: 40
    }

  }

  return (
      <div>
        {
          data.length > 0 ?
            <Chart
                options={options}
                series={series}
                type="line"
                height={550}
            />
              : <h1>Loading...</h1>
        }
      </div>
  )

}

export default ChartEvolution;