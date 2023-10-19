import {useEffect, useState} from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import styled from "styled-components";
import {URL} from "../utils";
import Modal from 'react-modal';

import 'react-tooltip/dist/react-tooltip.css'
import ChartCountries from "./ChartCountries";

const year = "2022";

const Map = () => {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("");

  const getData = async () => {
    const response = await fetch(`${URL}/data/${year}`);
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const returnStyleForCountryCode = (geoInfo) => {
    const [filteredData] = data.filter(d => d['Country'] === geoInfo.properties.name);
    if (!filteredData) {
      return "lightgray"
    } else {
      if (filteredData["dollar_price_avg"] < 1) {
        return "#FDE992";
      } else if (filteredData["dollar_price_avg"] < 2.5) {
        return "#FCD34D";
      } else if (filteredData["dollar_price_avg"] < 5) {
        return "#FB9337";
      } else if (filteredData["dollar_price_avg"] < 10) {
        return "#F54728";
      }
    }

  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


  return (
      <ContainerComposableMap>
        <Modal
            isOpen={country !== ""}
            onRequestClose={() => setCountry("")}
            style={customStyles}
        >
          <ChartCountries country={country} year={year}/>
        </Modal>
        <h1>Bigmac - Worlwide</h1>
        {
          data.length === 0 ? <h1>Loading...</h1>
              : <ComposableMap
                  projection="geoEqualEarth"
                  projectionConfig={{
                    scale: 150,
                  }}
              >
                <Geographies geography="/d3.json">
                  {({ geographies }) =>
                      geographies.map((geo) => (
                          <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={returnStyleForCountryCode(geo)}
                              stroke="#FFF"
                              onClick={() => setCountry(geo.properties.name)}

                          />
                      ))
                  }
                </Geographies>
              </ComposableMap>
        }
      </ContainerComposableMap>
  )
}

export default Map;

const ContainerComposableMap = styled.div`
  width: 70%;
  margin: auto;
  & > h1 {
    text-align: center;
    margin-bottom: -80px;
  }
`;