import React ,{useState}from "react";
import moment from "moment";
import 'moment/locale/ko';
import axios from "axios";
import styled from "styled-components";
import Modal from 'react-modal';
import Popup from "./popup_detail"
import { FaRegHeart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

const Infohead = styled.div`
    display : flex;
    width: 100%;
    flex-direction : row;

`

const NewsRow = ({auth,row,setalert,setArticles}) => {
    const [content, setContent] = useState(row);
    const title = content.meeting_name;
    const profile_image = content.created_by.profile_image;
    moment.locale();
    const meeting_date = moment(new Date(content.meeting_date)).format("YYYY.MM.DD(dddd)  HH:mm")
    const deadline = moment(new Date(content.deadline)).format("~YYYY.MM.DD(dddd)  HH:mm");
    const nickname = content.created_by.nickname  ?   content.created_by.nickname : "(익명)";
    const [modalIsOpen,setmodalIsOpen] = useState(false);

    const handleClick = () => {
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
    return (
        <>
            <div className="List-box">
                {profile_image ? <img src={profile_image} className="profile-image" ></img>
                :
                <IoPerson/>}
                
                <button className="List-button" onClick={() => {setmodalIsOpen(true); }}>
                    <Infohead>
                        <span className="list_button_text" style={{fontSize: "20px",fontWeight : "500"}}>
                            {title}
                        </span>
                        <span style={{marginLeft:"10px",color:"#979797",fontSize:"15px"}}>
                            {row.created_time}
                        </span>
                    </Infohead>
                    
                    <div className="list_button_text" style={{fontSize:"15px"}}>
                        {nickname}   |   {meeting_date}   |   {deadline}   |   {content.user_count}/{content.max_user}
                    </div>
                </button>
                <button onClick={handleClick} style={{background : 'none',border : 'none'}}>{content.is_liked ? <FaHeart size={24}/> : <FaRegHeart size={24}/>}</button>
            </div>
            <Modal className="PopUp" overlayClassName="Overlay" isOpen={modalIsOpen} onRequestClose={() => setmodalIsOpen(false)}>
                <Popup auth ={auth} content={content} setContent = {setContent} setmodalIsOpen={setmodalIsOpen} setArticles = {setArticles} />
            </Modal>
        </>
        

    );  
};
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


export default NewsRow