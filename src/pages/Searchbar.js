import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import ListView from "./ListView";
import './ListView.css';



const Container = styled.div`
    width:80%;
    display: flex;
    flex-direction:column;
    height:100vh;
    overflow: hidden;
`

function Searchbar(props){

    const [search,setSearch] = useState("");
    const [keyword,setKeyword] = useState("");
    const [sort, setSort] = useState("createdAt");

    const onChange = (e) => {
        setSearch(e.target.value)

    }

    useEffect(() => {
        if (!search) {
            setKeyword("");
        }
    }, [search]);

    const onSearch = () => {
        setKeyword(search)
    }
    
    return(
        <Container>
            <div className="Box">
                <input type = "text" className="searchbar" value = {search} onChange={onChange} />
                <button className="s-button" onClick={onSearch}><FaSearch/></button>
            </div>
      
            <div className="filterbox">
                <button className="text-button" onClick={() => setSort("meeting_date")}>모임 날짜</button>
                <button className="text-button" onClick={() => setSort("createdAt")}>최신 작성 순</button>
            </div>
            <ListView type = {props.type} keyword = {keyword} sort = {sort}/>
        </Container>
        
        
    );
}

export default Searchbar;