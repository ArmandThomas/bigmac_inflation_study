import { createGlobalStyle } from 'styled-components';
import Background from "../../src/assets/bg.png";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    font-family: 'Roboto', sans-serif;
  }
  svg {
     display: inline-block;
     vertical-align: middle;
  }
`;

export default GlobalStyle;