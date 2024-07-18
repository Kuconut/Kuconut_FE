import React from 'react';
import styled from "styled-components";
import Sidebar from '../Sidebar';
import Searchbar from '../Searchbar';

const Container = styled.div`
  display: flex;
  height:100vh;
`
const Play = () => {
  return (
    <div>
      <Container>
        <Sidebar/>
        <Searchbar type="play"/>
      </Container>
      
    </div>
  );
}

export default Play;