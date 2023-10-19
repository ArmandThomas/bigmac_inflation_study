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
      name: "BigMac Price ($)",
      type: "line",
      data: data.map(d => d['dollar_price_avg'])
    },
    {
      name: "Global Inflation (%)",
      type: "line",
      data: data.length > 0 ? data.map(d => d['global_inflation_avg'].toFixed(1)) : []
    },
    {
      name: "Energy Inflation (%)",
      type: "line",
      data: data.length > 0 ? data.filter(d => d['energy_inflation_avg'] !== null).map(d => d['energy_inflation_avg'].toFixed(1)) : []
    },
    {
      name: "Food Inflation (%)",
      type: "line",
      data: data.length > 0 ? data.filter(d => d['food_inflation_avg'] !== null).map(d => d['food_inflation_avg'].toFixed(1)) : []
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
  }

  return (
      <ContainerChart>
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
      </ContainerChart>
  )

}

const ContainerChart = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin: 20px;
`;

export default ChartCountries;
