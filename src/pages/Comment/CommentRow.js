import React ,{useState}from "react";
import './Comment.css'
import { IoPerson } from "react-icons/io5";

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

    const handleToggleReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <>
            <div className="comment-row">
                {profile_image ? <img src={profile_image} alt = "profile"className="profile-image"></img> :<IoPerson style={{marginRight : "10px"}}/>} 
                <div className="comment-text"> 
                    <div style={{ display : "flex" ,flexDirection: "row", alignItems: 'center'}}>
                        <div style={{marginRight : "10px",fontSize:"1.3vw"}}>{row.user.nickname} </div>
                        <div style={{fontSize : "0.9vw", color : "#979797"}}>{row.created_time}</div>
                    </div>
                    <div style={{fontSize:"1.2vw"}}>{row.content}</div>
                </div>
                {!isreply && 
                <div>
                    <button onClick = {() => setParentId(row.id)}className="comment-button">
                        <div style={{fontSize:"1vw"}}>답글달기</div>
                        
                        </button>
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