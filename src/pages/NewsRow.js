import React ,{useState}from "react";
import moment from "moment";
import 'moment/locale/ko';
import axios from "axios";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

const Infohead = styled.div`
    display : flex;
    width: 100%;
    flex-direction : row;

`

const NewsRow = ({auth,row,setmodal,setContent,setalert}) => {
    const title = row.meeting_name;
    moment.locale();
    const meeting_date = moment(new Date(row.meeting_date)).format("YYYY.MM.DD(dddd)  HH:mm")
    const deadline = moment(new Date(row.deadline)).format("~YYYY.MM.DD(dddd)  HH:mm");
    const nickname = row.created_by.nickname  ?   row.created_by.nickname : "(익명)";
    const [isLiked, setIsLiked] = useState(row.is_liked);

    const handleClick = () => {
        ClickLike(row.id, setalert,auth)
            .then(() => {
                // 좋아요 상태를 성공적으로 업데이트한 후, 로컬 상태를 업데이트합니다.
                setIsLiked(prevState => (prevState ? false : true));
            })
            .catch(error => {
                console.error('Error updating like status:', error);
            });
    }
    return (
        <div className="List-box">
            <IoPerson/>
            <button className="List-button" onClick={() => {setmodal(true); setContent(row);}}>
                <Infohead>
                    <span className="list_button_text" style={{fontSize: "20px",fontWeight : "500"}}>
                        {title}
                    </span>
                    <span style={{marginLeft:"10px",color:"#979797",fontSize:"15px"}}>
                        {row.created_time}
                    </span>
                </Infohead>
                
                <div className="list_button_text" style={{fontSize:"18px"}}>
                    {nickname}   |   {meeting_date}   |   {deadline}   |   {row.user_count}/{row.max_user}
                </div>
            </button>
            <button onClick={handleClick} style={{background : 'none',border : 'none'}}>{isLiked ? <FaHeart size={24}/> : <FaRegHeart size={24}/>}</button>
        </div>

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