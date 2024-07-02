import React from 'react';
import styled from "styled-components";
import Sidebar from '../Sidebar';

const Center = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`
const Extra = () => {
  return (
    <Center>
      <Sidebar/>
      <div>Extra 세부 페이지</div>
    </Center>
  );
}

export default Extra;