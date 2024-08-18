import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentRow from "./CommentRow";

const UpdateComment = async (id,parentId,comment) =>{


    const token = localStorage.getItem('access_Token');

    try {
        const response = await axios.post(`https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/comment/${id}`, 
        {
            content: comment,
            parent_id: parentId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // 서버로부터 받은 새 댓글 데이터를 반환합니다.
        return response.data;

    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
}

const CommentSection = ({id}) => {
    const [comments,setComments] = useState(null);
    const [comment,setComment] = useState("");
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

    const handleClick = async () => {
        try {
            const newComments = await UpdateComment(id, parentId, comment);
            setComments(newComments);
            console.log(newComments);
            setComment(""); // 입력값 초기화
            setParentId("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

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
                <button onClick={handleClick} >게시</button>
            </div>
            
        </div>
        
    );

}
export default CommentSection