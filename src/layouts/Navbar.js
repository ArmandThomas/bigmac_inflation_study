import {
  Outlet,
    Link
} from 'react-router-dom';
import styled from "styled-components";

const Navbar = () => {

  return(
      <>
        <ContainerNavbar>
          <ContainerLink>
            <Link to="/">Map</Link>
          </ContainerLink>
          <ContainerLink>
            <Link to="/evolution">Evolution</Link>
          </ContainerLink>
        </ContainerNavbar>
        <Outlet/>
      </>


  )

}

const ContainerNavbar = styled.div`
  display: flex;
  background-color: #000000;
  height: 80px;
  line-height: 80px;
  justify-content: flex-start;
  color: #ffffff;
  padding-left: 20px;
  
`;

const ContainerLink = styled.div`
  margin-left: 20px;
  & > a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: inherit;
    }
  }
`;


export default Navbar;