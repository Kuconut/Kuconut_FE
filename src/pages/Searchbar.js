import React, {useState } from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import ListView from "./ListView";
import Dropdown from "./Dropdown";
import Modal from "react-modal";
import './ListView.css';

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
    const [sort, setSort] = useState(false);
    const [search_key,setSearch_key] = useState("meeting_name_description");
    const [search_by,setSearch_By] = useState("제목+내용");
    const [isopen,setIsOpen] = useState(false);
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
        <>
            <Container>
                <div className="header"> 
                    <div className="Box">
                        <div style={{ width: '80px' }}>{search_by}</div>
                        <Dropdown>
                            <div>
                                <button onClick={() => {setSearch_By("제목+내용"); setSearch_key("meeting_name_description");}}>제목+내용</button>
                                <button onClick={() => {setSearch_By("작성자"); setSearch_key("created_by");}}>작성자</button>
                            </div>
                        </Dropdown>
                        <input type = "text" className="searchbar" value = {search} onChange={onChange} />
                        <FaSearch size={24} color="1C4696"/>
                        {/* <button className="s-button" ><FaSearch/></button> */}
                    </div>
                    <button className="side_button" onClick={goToCreate}><LuPencilLine size={30}/></button>
                    <button className="side_button" onClick={goToMypage}><IoPerson size={30}/></button>
                    <Dropdown>
                            <div>
                                <button onClick={goToMypage}>마이페이지</button>
                                <button onClick={() => setIsOpen(true)}>로그아웃</button>
                            </div>
                    </Dropdown>
                    
                </div>
      
                <div className="filterbox">
                    <button className="text-button" onClick={() => setSort(false)}>모임 날짜</button>
                    <button className="text-button" onClick={() => setSort(true)}>최신 작성 순</button>
                </div>
                <ListView type = {props.type} keyword = {search} sort = {sort} search_key = {search_key}/>
            </Container>
            <Modal className = 'alert_Modal'overlayClassName="Overlay" isOpen = {isopen} onRequestClose={() => setIsOpen(false)}>
                <div>로그아웃하시렵니까?</div>
                <div className="button-container">
                    <button onClick={() => {localStorage.removeItem('access_Token');setIsOpen(false); navigate("/")}} >예</button>
                    <button onClick={() => setIsOpen(false)}>아니요</button>
                </div>
            </Modal>
        </>
        
        
        
    );
}

export default Searchbar;