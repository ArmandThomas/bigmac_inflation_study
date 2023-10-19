import {useEffect, useState} from "react";
import {URL} from "../utils";
import Chart from 'react-apexcharts'
import styled from "styled-components";

const ChartCountries = ({country}) => {

  const [data, setData] = useState([]);

  const getData = async () => {

    const req = await fetch(`${URL}/data/by_country`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        country
      })
    });

    const res = await req.json();

    setData(res);

  }

  useEffect(() => {
    getData();
  }, [country])


  const series = [
    {
      name: "BigMac Price",
      type: "line",
      data: data.map(d => d['dollar_price_avg'])
    },
    {
      name: "Inflation",
      type: "line",
      data: data.length > 0 ? data.map(d => d['inflation_value'].toFixed(1)) : []
    }
  ];


  const options = {
    chart: {
      type: 'area',
      stacked: false,
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: `Evolution of BigMac Price and Inflation in ${country}`,
      align: 'left'
    },
    xaxis: {
      categories: data.map(d => d['Year']),
    },
    yaxis: [
      {
        seriesName: 'BigMac Price',
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
          formatter: function (val) {
            if (val) {
              return val?.toFixed(2) + " $";
            }
          }
        },
        title: {
          text: "BigMac Price",
          style: {
            color: '#008FFB',
          }
        },
      },
      {
        seriesName: 'Inflation',
        opposite: false,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        labels: {
          style: {
            colors: '#00E396',
            fontSize: '16px'
          },
          formatter: function (val) {
            if (val) {
              return val?.toFixed(1) + " %";
            }
          }
        },
        title: {
          text: "Inflation",
          style: {
            color: '#00E396',
          }
        }
      }
    ]
  }

  return (
      <div>
        {
          data.length > 0 &&
          <Chart
              options={options}
              series={series}
              type="area"
              height={500}
              width={1300}
          />
        }
      </div>
  )

}


export default ChartCountries;
