import React, {useState } from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import ListView from "./ListView";
import Dropdown from "./Dropdown";
import './ListView.css';
import '../App.css';

import { IoPerson } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";

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
    const [search_by,setSearch_By] = useState("제목+내용");
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
                    <div style={{ width: '80px' }}>{search_by}</div>
                    <Dropdown>
                        <div>
                            <button onClick={() => setSearch_By("제목+내용")}>제목+내용</button>
                            <button onClick={() => setSearch_By("작성자")}>작성자</button>
                        </div>
                    </Dropdown>
                    <input type = "text" className="searchbar" value = {search} onChange={onChange} />
                    <FaSearch size={24} color="1C4696"/>
                    {/* <button className="s-button" ><FaSearch/></button> */}
                </div>
                <button className="side_button" onClick={goToCreate}><LuPencilLine size={30}/></button>
                <button className="side_button" onClick={goToMypage}><IoPerson size={30}/></button>
                
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