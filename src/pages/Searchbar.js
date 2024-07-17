import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Box = styled.div`
    height : 60px;
    margin : 90px 90px 0px 20%;
    padding-left : 100px;
    display : flex;
    flex-direction: row;
    position: fixed;
    z-index: 1000px;
`

function Searchbar(){

    const [search,setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }
    return(
        <Box>
            <input type = "text" className="searchbar" value = {search} onChange={onChange} />
            <button className="s-button"><FaSearch/></button>
        </Box>
    
        
    );
}

export default Searchbar;