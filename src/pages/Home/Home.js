import React from "react";
import styled from "styled-components";

import Sidebar from "../Sidebar";
import Searchbar from "../Searchbar";
import Filter from "../Filter";


const Center = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`


class Home extends React.Component {
  render() {
    return(
        <Center>
          <Sidebar/>
          <Searchbar/>
          <Filter/>
        </Center>
    );
  }
}

export default Home;