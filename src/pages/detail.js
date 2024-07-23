import React from "react";
import styled from "styled-components";

import Sidebar from "./Sidebar.js";
import Searchbar from "./Searchbar.js";




const Container = styled.div`
  display: flex;
  height:100vh;
`



const Detail = ({page}) => {
  return(
    <Container>
      <Sidebar/>
      <Searchbar type = {page}/>
    </Container>
 
  );
}
    

export default Detail;