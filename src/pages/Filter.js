import React from "react";
import { IoOptionsOutline } from "react-icons/io5";
import styled from "styled-components";

const Box = styled.div`
    height : 60px;
    margin : 90px;
    display : flex;
    flex-direction: row;
    position: relative;
`

function filter(){
    return(
        <Box>
            <button className="s-button"><IoOptionsOutline/></button>
        </Box>
        
    );
}

export default filter;
