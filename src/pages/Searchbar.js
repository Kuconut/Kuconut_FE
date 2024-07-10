import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Box = styled.div`
    height : 60px;
    margin : 90px;
    display : flex;
    flex-direction: row;
    position: relative;
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