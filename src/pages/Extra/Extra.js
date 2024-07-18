import React from 'react';
import styled from "styled-components";
import Sidebar from '../Sidebar';
import Searchbar from '../Searchbar';


const Container = styled.div`
  display: flex;
  height:100vh;
`
const Extra = () => {
  return (
    <div>
      <Container>
        <Sidebar/>
        <Searchbar type="extra"/>
      </Container>
      
    </div>
  );
}

export default Extra;