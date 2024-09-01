import React ,{useState}from "react";
import './Comment.css'
import { IoPerson } from "react-icons/io5";
import moment from "moment";
import 'moment/locale/ko';

const ReplyComment = ({ children ,setParentId}) => {
    return (
        <ul>
            {children && children.map((v, inx) => (
                <CommentRow row = {v} setParentId={setParentId} isreply={true} key={inx}/>
            ))}
        </ul>
    );
};

const CommentRow = ({ row ,setParentId,isreply}) => {
    const [showReplies, setShowReplies] = useState(false);
    const profile_image = row.user.profile_image
    const createdtime = moment.utc(row.createdAt) // UTC 시간으로 파싱
    .utcOffset('+09:00') // KST 시간대 (UTC+9)로 변환
    .fromNow(); // 상대적 시간으로 변환

    const handleToggleReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <>
            <div className="comment-row">
                {profile_image ? <img src={profile_image} className="profile-image"></img> :<IoPerson style={{marginRight : "10px"}}/>} 
                <div className="comment-text"> 
                    <div style={{ display : "flex" ,flexDirection: "row", alignItems: 'center'}}>
                        <div style={{marginRight : "10px"}}>{row.user.nickname} </div>
                        <div style={{fontSize : "10px", color : "#979797"}}>{createdtime}</div>
                    </div>
                    <div>{row.content}</div>
                </div>
                {!isreply && 
                <div>
                    <button onClick = {() => setParentId(row.id)}className="comment-button">답글 달기</button>
                </div> }
                
            </div>
            {row.children && row.children.length > 0 && (
                <div>
                    <button className ="comment-button"onClick={handleToggleReplies}>
                        {showReplies ? '답글 숨기기' : '답글 보기'}
                    </button>
                    {showReplies && <ReplyComment children={row.children} setParentId = {setParentId} />}
                </div>
            )}
        </>
    );
};

export default CommentRow;