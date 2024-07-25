import React, {useState } from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import ListView from "./ListView";
import './ListView.css';
import '../App.css';

import { IoPerson } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";

const Container = styled.div`
    width:80%;
    display: flex;
    flex-direction:column;
    height:100vh;
    overflow: hidden;
`

function Searchbar(props){

    const navigate = useNavigate();

    const [search,setSearch] = useState("");
    const [sort, setSort] = useState("createdAt");

    const onChange = (e) => {
        setSearch(e.target.value)

    }
    const goToMypage = () => {
        navigate("/home/mypage");
      }
    const goToCreate = () => {
        navigate("/home/create");
    }


    return(
        <Container>
            <div className="header"> 
                <div className="Box">
                    <FaSearch className="searchicon"/>
                    <input type = "text" className="searchbar" value = {search} onChange={onChange} />
                    {/* <button className="s-button" ><FaSearch/></button> */}
                </div>
                <button className="side_button" onClick={goToMypage}><IoPerson size={24}/></button>
                <button className="side_button" onClick={goToCreate}><LuPencilLine size={24}/></button>
            </div>
            

      
            <div className="filterbox">
                <button className="text-button" onClick={() => setSort("meeting_date")}>모임 날짜</button>
                <button className="text-button" onClick={() => setSort("createdAt")}>최신 작성 순</button>
            </div>
            <ListView type = {props.type} keyword = {search} sort = {sort}/>
        </Container>
        
        
    );
}

export default Searchbar;