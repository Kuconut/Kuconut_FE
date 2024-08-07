import React ,{useState}from "react";
import moment from "moment";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

const NewsRow = ({row,setmodal,setContent,setalert}) => {
    const title = row.meeting_meeting_name;
    const meeting_date = moment(new Date(row.meeting_meeting_date)).format("YYYY.MM.DD HH:mm:ss");
    const deadline = moment(new Date(row.meeting_deadline)).format("YYYY.MM.DD HH:mm:ss");
    const [isLiked, setIsLiked] = useState(row.is_liked);

    const handleClick = () => {
        ClickLike(row.meeting_id, setalert)
            .then(() => {
                // 좋아요 상태를 성공적으로 업데이트한 후, 로컬 상태를 업데이트합니다.
                setIsLiked(prevState => (prevState === '1' ? '0' : '1'));
            })
            .catch(error => {
                console.error('Error updating like status:', error);
            });
    }
    return (
        <div className="List-box">
            <IoPerson/>
            <button className="List-button" onClick={() => {setmodal(true); setContent(row);}}>
                <span className="list_button_text">
                    {title}
                </span>
                <span className="list_button_text" style={{color: "gray"}}>
                    {meeting_date} | {deadline} | {row.user_count}/{row.max_user}
                </span>
            </button>
            <button onClick={handleClick} style={{background : 'none',border : 'none'}}>{isLiked === '1'? <FaHeart size={24}/> : <FaRegHeart size={24}/>}</button>
        </div>

    );  
};
const ClickLike = (row,setalert) =>{

    const token = localStorage.getItem('access_Token');
    return  axios.get(`https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Checktoken`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if(response.status === 200){
                setalert(false);
                axios.patch(`https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/like`,{
                    "meeting_id": row.meeting_id
                },{headers:{
                    Authorization: `Bearer ${token}`
                }}
            )
                .then((response) => {
                    console.log(response);
                })
                .catch((response) => {
                    console.log(response);
                });
            }else{
                console.log(response.status);
                setalert(true);
            }
        })
        .catch((response) => {
            console.log(response);
            setalert(true);
        });

    
}

export default NewsRow