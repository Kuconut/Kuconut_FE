import React , {useEffect,useState} from "react";
import styled from "styled-components";
import Modal from 'react-modal';
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import CommentSection from "./Comment/CommentSection";
import parse from "html-react-parser/lib/index";
import axios from "axios";
import './Comment/Comment.css'
import './ListView.css'

import { FaRegTrashAlt } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";

const Container = styled.div`
  display: flex;
  height:100%;
  flex-direction: column;
`
const Popupheader = styled.div`
    display : flex;
    width : 100%;
    height : 20%;
    flex-direction : row;
    justify-content : space-between;
`
const Row = styled.div`
    display : flex;
    flex-direction: row;
    height : 80%
`
const CommentBox = styled.div`
    flex:2;
    height : calc(100%-30px);
    width:50%;
    padding : 10px 20px;

`
const DescriptionBox = styled.div`
    flex:3;
    height : calc(100%-30px);
    padding : 10px 20px;
    display : flex;
    flex-direction : column;
    border-radius : 5%;
`
const Contentsection = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    height : 80%;
    &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`
const Buttonsection = styled.div`
    display : flex;
    justify-content: end;
    align-items: end;
    flex-direction : row;
    height : 20%;
`
const Infohead = styled.div`
    display : flex;
    width: 100%;
    flex-direction : row;

`
const Popup = ({auth,content,setmodalIsOpen,setContent}) => {
    
    const navigate = useNavigate();
    const [alert,setalert] = useState(false);
    const meeting_date = moment(new Date(content.meeting_date)).format("YYYY.MM.DD(dddd)  HH:mm")
    const deadline = moment(new Date(content.deadline)).format("~YYYY.MM.DD(dddd)  HH:mm");
    const nickname = content.created_by.nickname  ?   content.created_by.nickname : "(익명)";

    useEffect(() => {
        if(auth){
            setalert(false);
        }else setalert(true);
    }, [auth]);
    const handleLike = () => {
        ClickLike(content.id, setalert,auth)
            .then(() => {
                // 좋아요 상태를 성공적으로 업데이트한 후, 로컬 상태를 업데이트합니다.
                setContent(prevContent => ({
                    ...prevContent,
                    is_liked: !content.is_liked
                }));
            })
            .catch(error => {
                console.error('Error updating like status:', error);
            });
    }
    const handleJoin = () => {
        ClickJoin(content.id, setalert,auth)
            .then(() => {
                // 좋아요 상태를 성공적으로 업데이트한 후, 로컬 상태를 업데이트합니다.
                setContent(prevContent => ({
                    ...prevContent,
                    user_count : content.user_count + 1,
                    is_joined: !content.is_joined
                }));
            })
            .catch(error => {
                console.error('Error updating join status:', error);
            });
    }
    const handleLeave = () => {
        ClickLeave(content.id, setalert,auth)
            .then(() => {
                // 좋아요 상태를 성공적으로 업데이트한 후, 로컬 상태를 업데이트합니다.
                setContent(prevContent => ({
                    ...prevContent,
                    user_count : content.user_count - 1,
                    is_joined: !content.is_joined
                }));
            })
            .catch(error => {
                console.error('Error updating leave status:', error);
            });
    }
    return(
        <Container>
            <Popupheader>
                <div style={{width:"90%",padding:"20px"}}>
                    <Infohead>
                        <span className="list_button_text" style={{fontSize: "20px",fontWeight : "500",marginBottom:"20px"}}>
                            {content.meeting_name}
                        </span>
                        <span style={{marginLeft:"10px",color:"#979797",fontSize:"15px"}}>
                            {content.created_time}
                        </span>
                    </Infohead>
                    
                    <div className="list_button_text" style={{fontSize:"18px"}}>
                        {nickname}   |   {meeting_date}   |   {deadline}   |   {content.user_count}/{content.max_user}
                    </div>
                </div>
                <button onClick={() => setmodalIsOpen(false)} style={{background:"white" , border : "none",height : "50px"}}><FaXmark size={24}/></button>
                
            </Popupheader>
            
            <Row>
                <DescriptionBox>
                    <Contentsection style={{ maxHeight: '80%', overflowY: 'auto' }}>
                        <div>{parse(content.meeting_description)}</div>
                    </Contentsection>  
                    {content.is_mine ? 
                    <Buttonsection>
                        {content.is_liked? 
                        <button className="popup-button" onClick={handleLike}>
                            <FaHeart style={{marginRight : "5px"}} size={24}/>
                            찜취소
                        </button>  : 
                        <button className="popup-button" onClick={handleLike}>
                            <FaRegHeart style={{marginRight : "5px"}} size={24}/>
                            찜하기
                        </button>}
                        <button className = "popup-button">
                            <LuPencilLine style={{marginRight : "5px"}} size={24}/>
                            수정하기
                        </button>
                        <button className="popup-button" style={{backgroundColor:"#EB4B4B"}} >
                            <FaRegTrashAlt style={{marginRight : "5px", color:"white"}} size={24}/>
                            <div style={{color:"white"}}>삭제하기</div>
                        </button>
                    </Buttonsection>    : 
                    
                    <Buttonsection>
                     {content.is_liked? 
                        <button className="popup-button" onClick={handleLike}>
                            <FaHeart style={{marginRight : "5px"}} size={24}/>
                            찜취소
                        </button>  : 
                        <button className="popup-button" onClick={handleLike}>
                            <FaRegHeart style={{marginRight : "5px"}} size={24}/>
                            찜하기
                        </button>}
                        {content.is_joined ?
                            <button className="popup-button" style={{backgroundColor : "#EB4B4B"}} onClick={handleLeave}>
                                <FiLogOut style={{marginRight : "5px",color:"white"}} size={24}/>
                                <div style={{color:"white"}}>나가기</div>
                            </button> :
                            <button className="popup-button" style={{backgroundColor : "#3C64C8"} }onClick={handleJoin}>
                                <FiLogIn style={{marginRight : "5px",color:"white"}} size={24}/>
                                <div style={{color:"white"}}>합류하기</div>
                            </button>
                        }
                    
                    </Buttonsection>}
                    
                    
                </DescriptionBox>
                <CommentBox>
                    <CommentSection id = {content.id} />
                </CommentBox>
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
const ClickLike = (id,setalert,auth) =>{

    if (!auth) {
        setalert(true);
        return Promise.reject('User not authenticated');
    }else setalert(false);

    const token = localStorage.getItem('access_Token');
    return axios.patch(
        `https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/like`,
        { "meeting_id": id },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(response => {
        console.log('Like status updated:', response);
    })
    .catch(error => {
        console.error('Error updating like status:', error);
    });
}

const ClickJoin = (id,setalert,auth) =>{

    if (!auth) {
        setalert(true);
        return Promise.reject('User not authenticated');
    }else setalert(false);

    const token = localStorage.getItem('access_Token');
    return axios.patch(
        `https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/join`,
        { "meeting_id": id },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(response => {
        console.log('Join status updated:', response);
    })
    .catch(error => {
        console.error('Error updating join status:', error);
    });
}
const ClickLeave = (id,setalert,auth) =>{

    if (!auth) {
        setalert(true);
        return Promise.reject('User not authenticated');
    }else setalert(false);

    const token = localStorage.getItem('access_Token');
    return axios.patch(
        `https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/leave`,
        { "meeting_id": id },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(response => {
        console.log('Leave status updated:', response);
    })
    .catch(error => {
        console.error('Error updating leave status:', error);
    });
}
export default Popup;