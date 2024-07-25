import React from "react";
import styled from "styled-components";
import './ListView.css'

import { IoArrowBack } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  height:50vh;
  flex-direction: column;
`
const Row = styled.div`
    display : flex;
    flex-direction: row;
    justify-content: space-between;
`
const Placeholder = styled.div`
    height : 300px;
    width:50%;
    border: solid;
    border-color : gray;

`

const Popup = ({content,setmodalIsOpen}) => {
    return(
        <Container>
            <button className ='back-button'onClick={() => setmodalIsOpen(false)} ><IoArrowBack size={24}/></button>
            <Row>
                <div>{content.meeting_name}</div>
                <Placeholder>
                    <div>댓글창</div>
                </Placeholder>
            </Row>
            
        </Container>
        

    );
}

export default Popup;