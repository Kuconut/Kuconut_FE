import React,{useState} from "react";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa6";
import "./Comment.css";

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

const Commentinput = ({id,parentId,setParentId,setComments}) =>{
    const [comment,setComment] = useState("");
    

    const handleClick = async () => {
        if(comment.length !== 0 ){
            try {
                const newComments = await UpdateComment(id, parentId, comment);
                setComments(newComments);
                console.log(newComments);

                setComment(""); // 입력값 초기화
                setParentId("");
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
        
    };
    return(
        <div className="input-container">
                    <input 
                        placeholder= "댓글을 입력하세요"
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} // 입력값을 상태로 관리
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleClick();
                            }
                        }} 
                    />
                    <button onClick={handleClick} ><FaArrowUp size={20}/></button>
                </div>
    );
}

export default Commentinput