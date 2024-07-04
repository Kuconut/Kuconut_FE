import React, { useState } from "react";
import styled from "styled-components";

const Box = styled.div`
    height : 30px;
    padding : 10px;
    display : flex;
    flex-direction: row;
`

function Searchbar(){

    const [search,setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }
    return(
        <Box>
            <input type = "text" style={{width:500}} value = {search} onChange={onChange} />
        </Box>
        
    );
}

export default Searchbar;