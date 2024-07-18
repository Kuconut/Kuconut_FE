import React from 'react';
import styled from "styled-components";
import Sidebar from '../Sidebar';
import Searchbar from '../Searchbar';

const Container = styled.div`
  display: flex;
  height:100vh;
`
const Study = () => {
  return (
    <div>
      <Container>
        <Sidebar/>
        <Searchbar type="study"/>
      </Container>
      
    </div>
  );
}

export default Study;