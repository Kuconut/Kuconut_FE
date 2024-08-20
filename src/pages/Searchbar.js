import React, {useState,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import ListView from "./ListView";
import Dropdown from "./Dropdown";
import Modal from "react-modal";
import './ListView.css';

import { MdOutlinePerson } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

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
    const [auth,setAuth] = useState(false);
    const onChange = (e) => {
        setSearch(e.target.value)

    }
    const goToMypage = () => {
        navigate("/home/mypage");
      }
    const goToCreate = () => {
        navigate("/home/create");
    }
    useEffect(() => {
        const token = localStorage.getItem('access_Token');
        axios.get(`https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Checktoken`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if(response.status === 200){
                setAuth(true);
            }else{
                console.log(response.status);
                setAuth(false);
            }
        })
        .catch((response) => {
            console.log(response);
            setAuth(false);
        });
    }, []);

    return(
        <>
            <Container>
                <div className="header"> 
                    <div className="Box">
                        <div style={{ width: '80px' }}>{search_by}</div>
                        <Dropdown iconOpen={<IoMdArrowDropup size={24}/>} iconClose={<IoMdArrowDropdown size={24} />}>

                            <div>
                                <button onClick={() => {setSearch_By("제목+내용"); setSearch_key("meeting_name_description");}}>제목+내용</button>
                                <button onClick={() => {setSearch_By("작성자"); setSearch_key("created_by");}}>작성자</button>
                            </div>
                        </Dropdown>
                        <input type = "text" className="searchbar" value = {search} onChange={onChange} />
                        <FaSearch size={24} color="444444"/>
                        <div className="filterbox">
                            <button className="text-button" onClick={() => setSort(false) } style={{color: sort? "#979797" : "black"}}>모임 날짜 가까운 순</button>
                            <button className="text-button" onClick={() => setSort(true)} style={{color: sort? "black" : "#979797"}}>최근에 만들어진 모임 순</button>
                        </div>
                        {/* <button className="s-button" ><FaSearch/></button> */}
                    </div>
                    {auth?(
                        <>
                            <button className="side_button" onClick={goToCreate}><LuPencilLine size={30}/></button>
                            <Dropdown iconOpen={<MdOutlinePerson size={40}/>} iconClose={<MdOutlinePerson size={40}/>}>
                                    <div>
                                        <button onClick={goToMypage}>마이페이지</button>
                                        <button onClick={() => setIsOpen(true)}>로그아웃</button>
                                    </div>
                            </Dropdown>
                        </>
                    ):(
                        <button style = {{border:"none", background:"none",fontSize:"15px", width:"150px"}}onClick={() => {navigate('/login')}}>로그인/회원가입</button>
                    )}
                    
                    
                </div>
      
                
                <ListView auth = {auth} type = {props.type} keyword = {search} sort = {sort} search_key = {search_key}/>
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