import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentRow from "./CommentRow";

import Commentinput from './Commentinput';



const CommentSection = ({id}) => {
    const [comments,setComments] = useState(null);
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

    const Commentprops = {
        id,
        parentId,
        setParentId,
        setComments
    }

    return(
        <div className="comment-section">  
            <ul className="comment-listview">
                {comments && comments.map((v, inx) => {
                    return <CommentRow key = {inx} row = {v} isreply = {false} {...Commentprops}/>
                })}
            </ul>
            <div className="input-section">
                <Commentinput {...Commentprops}/>
            </div>
            
        </div>
        
    );

}
export default CommentSection