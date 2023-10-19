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

  const [zoom, setZoom] = useState(160);

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
      <Container>
        <Bottom>
          <ZoomContainer>
            <button onClick={() => setZoom(zoom + 10)}>+</button>
            <button onClick={() => setZoom(zoom - 10)}>-</button>
          </ZoomContainer>
          <Legend>
            <div>
              <div style={{backgroundColor: "#FDE992"}}/>
              <p>Less than 1$</p>
            </div>
            <div>
              <div style={{backgroundColor: "#FCD34D"}}/>
              <p>Between 1$ and 2.5$</p>
            </div>
            <div>
              <div style={{backgroundColor: "#FB9337"}}/>
              <p>Between 2.5$ and 5$</p>
            </div>
            <div>
              <div style={{backgroundColor: "#F54728"}}/>
              <p>Between 5$ and 10$</p>
            </div>
          </Legend>
        </Bottom>

        <ContainerComposableMap>
          <Modal
              isOpen={country !== ""}
              onRequestClose={() => setCountry("")}
              style={customStyles}
          >
            <ChartCountries country={country} year={year}/>
          </Modal>
          {
            data.length === 0 ? <h1>Loading...</h1>
                : <ComposableMap
                    projection="geoEqualEarth"
                    projectionConfig={{
                      scale: zoom,
                      rotation: [-11, 0, 0],
                    }}
                    width={800}
                    height={400}
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
      </Container>


  )
}

export default Map;

const ZoomContainer = styled.div`
  width: 20%;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  padding-left: 50px;
  align-items: center;
  `;

const Bottom = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  position: relative;
  top : -80px;
`;


const Legend = styled.div`
  display: flex;
  align-items: center;

  
  & > div {
    display: flex;
    align-items: center;
    margin: 0 10px;
  }
  
  & > div > div {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  & > div > p {
    font-size: 12px;
  }
`;


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
`;

const ContainerComposableMap = styled.div`
  width: 60%;
  border : 2px solid lightgrey;
  border-radius: 10px;
  overflow: hidden;
  margin: auto;
  & > h1 {
    text-align: center;
  }
`;