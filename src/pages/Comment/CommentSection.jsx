import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentRow from "./CommentRow";

const UpdateComment = () =>{
    
}

const CommentSection = ({id}) => {
    const [comments,setComments] = useState(null);
    const [comment,setComment] = useState(null);
    const [parentId,setParentId] = useState("");

    useEffect(() => {
        axios.get(`https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/comment/${id}`)
        .then((response) => {
            setComments(response.data);
            console.log(response.data);
        })
        .catch((response) => {
            console.log(response);
        })
    },[id]);

    const HandleClick = () => {
        UpdateComment(id,)
            .then(() => {
               
            })
            .catch(error => {
                console.error(error);
            });
    }
    return(
        <div className="comment-section">  
            <ul className="comment-listview">
                {comments && comments.map((v, inx) => {
                    return <CommentRow key = {inx} row = {v} setParentId={setParentId}/>
                })}
            </ul>
            <div className="comment-input-container">
                <input 
                    placeholder="댓글 달기" 
                    className="comment-input" 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} // 입력값을 상태로 관리
                />
                <button onClick={HandleClick} >게시</button>
            </div>
            
        </div>
        
    );

}
export default CommentSection