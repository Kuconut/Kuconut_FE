import React , {useEffect,useState} from "react";
import styled from "styled-components";
import Modal from 'react-modal';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
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
    margin : 10px;
`
const Placeholder = styled.div`
    flex:1;
    height : 70vh;
    width:50%;
    border: solid;
    border-color : gray;

`
const DescriptionBox = styled.div`
    flex:1;
    display : flex;
    flex-direction : column;
    border-radius : 5%;
    background-color : lightgray;
`
const Popup = ({content,setmodalIsOpen}) => {
    
    const navigate = useNavigate();
    const [alert,setalert] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_Token');
        axios.get(`https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Checktoken`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if(response.status === 200){
                setalert(false);
            }else{
                console.log(response.status);
                setalert(true);
            }
        })
        .catch((response) => {
            console.log(response);
            setalert(true);
        });
    }, []);

    return(
        <Container>
            <Row>
                <button className ='back-button'onClick={() => setmodalIsOpen(false)} ><IoArrowBack size={24}/></button>
                <div>{content.meeting_name}</div>
            </Row>
            
            <Row>
                <DescriptionBox>  
                    <div>{content.meeting_description}</div>
                </DescriptionBox>
                <Placeholder>
                    <div>댓글창</div>
                </Placeholder>
            </Row>
            <Modal className = 'alert_Modal'overlayClassName="blur" isOpen ={alert}> 
                <div>로그인이 필요합니다.</div>
                <div>로그인 하시겠습니까?</div>
                <div className="button-container">
                    <button onClick={() => navigate('/login')}>예</button>
                    <button onClick={() => setmodalIsOpen(false)}>아니요</button>
                </div>
                
            </Modal>
        </Container>
        
        

    );
    
}

export default Popup;