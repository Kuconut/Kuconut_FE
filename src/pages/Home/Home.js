import React from "react";
import styled from "styled-components";

import Sidebar from "../Sidebar";


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
          <div> All세부 페이지</div>
        </Center>
    );
  }
}

export default Home;