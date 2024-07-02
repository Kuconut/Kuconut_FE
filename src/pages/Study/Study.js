import React from 'react';
import styled from "styled-components";
import Sidebar from '../Sidebar';

const Center = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`
const Study = () => {
  return (
    <Center>
      <Sidebar/>
      <div>Study 세부 페이지</div>
    </Center>
  );
}

export default Study;