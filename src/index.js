import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from "./global/GlobalStyle";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Map from "./components/Map";
import Navbar from "./layouts/Navbar";
import ChartEvolution from "./components/ChartEvolution";

const router = createBrowserRouter([
  {
    element: <Navbar/>,
    children: [
      {
        path: "/",
        element : <Map/>
      },
      {
        path: "/evolution",
        element : <ChartEvolution/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);

