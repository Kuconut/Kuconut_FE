import React from 'react';
import styled from "styled-components";
import Sidebar from '../Sidebar';

const Center = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`
const Eat = () => {
  return (
    <Center>
      <Sidebar/>
      <div>Eat 세부 페이지</div>
    </Center>
  );
}

export default Eat;