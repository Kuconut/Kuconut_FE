import React ,{useState}from "react";
import styled from "styled-components";
import './Comment.css'

const Row = styled.div`
    flex-direction : row;
`
const ReplyComment = ({ children }) => {
    return (
        <ul>
            {children && children.map((v, inx) => (
                <div className="comment-text">-{v.content}</div>
            ))}
        </ul>
    );
};

const CommentRow = ({ row ,setParentId}) => {
    const [showReplies, setShowReplies] = useState(false);

    const handleToggleReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <>
            <div className="comment-row">
                <div className="comment-text">{row.content}</div>
                <div>
                    <button onClick = {() => setParentId(row.id)}className="comment-button">답글 달기</button>
                </div>
            </div>
            {row.children.length > 0 && (
                <div>
                    <button className ="comment-button"onClick={handleToggleReplies}>
                        {showReplies ? '답글 숨기기' : '답글 보기'}
                    </button>
                    {showReplies && <ReplyComment children={row.children} />}
                </div>
            )}
        </>
    );
};

export default CommentRow;