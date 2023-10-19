import {useEffect} from "react";

const ChartCountries = ({country}) => {

  useEffect(() => {
    console.log(country);
  }, [country])

  return (
      <div>
        <h1>{country}</h1>
      </div>
  )

}

export default ChartCountries;
