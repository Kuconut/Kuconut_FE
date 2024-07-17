import React from 'react';
import styled from "styled-components";
import Sidebar from '../Sidebar';
import Searchbar from '../Searchbar';
import ListView from '../ListView';

const Container = styled.div`
  display: flex;
  height:100vh;
`
const Study = () => {
  return (
    <div>
      <Container>
        <Sidebar/>
        <Searchbar/>
        <ListView type="study"/>
      </Container>
      
    </div>
  );
}

export default Study;