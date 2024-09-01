import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import Modal from "react-modal";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './EditMeeting.css';

const Write = styled.div`
    height: 55vh;
    box-sizing: border-box;
    margin-left: -1vw;
    margin-right: -1vw;

    .ql-container {
        height: 50vh;
        border: none !important;
        border-radius: inherit;
        display: flex;
        flex-direction: column;
    }

    .ql-editor {
        flex: 1;
        border: none;
        box-sizing: border-box;
        overflow-y: auto;
        text-align: left !important;
    }

    .ql-toolbar {
        border: none !important;
        border-bottom: 1px solid #ccc;
        border-radius: inherit;
    }

    .ql-align-left {
        text-align: left !important;
    }
    .ql-align-center {
        text-align: center !important;
    }
    .ql-align-right {
        text-align: right !important;
    }
    .ql-align-justify {
        text-align: justify !important;
    }
`;

const ModalContainer = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    }
;`

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
;`

const ModalTitle = styled.h2`
    text-align: left;
    margin-bottom: 7px;
    font-size: 15px;
;`

const ModalButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
;`

const ModalButton = styled.button`
    margin-top: 20px;
    margin-left: 10px;
;`

const Submitbutton = styled.button`
    background-color: rgb(60, 100, 200);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 15px;
    cursor: pointer;
    text-align: center;
    font-size: 1rem;

    &:hover {
        background-color: rgb(53, 87, 176);
    }
;`

const ReadOnlyInput = styled.input`
    background-color: #f0f0f0; 
    cursor: not-allowed;
    border: 1px solid #ccc; 
    padding: 0.5rem;
`;

const Align = ReactQuill.Quill.import("formats/align");
Align.whitelist = ["left", "center", "right", "justify"];

const Icons = ReactQuill.Quill.import("ui/icons");
Icons.align["left"] = Icons.align[""];

const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const EditMeeting = () => {
    const editorRef = useRef(null);
    const [editorHtml, setEditorHtml] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [loginModalOpen, setLoginModalOpen] = useState(false); 
    const navigate = useNavigate();
    const location = useLocation();
    const { content } = location.state || {};
    const [minParticipants, setMinParticipants] = useState(content.min_user);
    const [maxParticipants, setMaxParticipants] = useState(content.max_user);

    const formattedMeetingDate = formatDateForInput(content.meeting_date);
    const formattedDeadline = formatDateForInput(content.deadline);

    useEffect(() => {
        const token = localStorage.getItem('access_Token');

        if (!token) {
            setLoginModalOpen(true);
        }
        else {
            axios.get('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Checktoken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status !== 200) {
                    setLoginModalOpen(true);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoginModalOpen(true);
            });
        }
    }, []);

    useEffect(() => {

        setEditorHtml(content.meeting_description || '');
    }, [content.meeting_description]);

    useEffect(() => {
        const quill = editorRef.current.getEditor();
    
        quill.format('align', 'left');
    }, []);

    useEffect(() => {
        if (editorRef.current) {
            const quill = editorRef.current.getEditor();
            const content = quill.getContents();
            
            const align = content.ops.find(op => op.attributes && op.attributes.align);
            if (align) {
                quill.format('align', align.attributes.align);
            } else {
                quill.format('align', 'left');
            }
        }
    }, [editorHtml]);

    const handleMinParticipantsChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value <= content.min_user && value >= 2) {
            setMinParticipants(value);
            if (value > maxParticipants) {
                setMaxParticipants(value);
            }
        }
    };

    const handleMaxParticipantsChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value >= content.max_user) { 
            setMaxParticipants(value);
        }
    };

    const handleDescriptionChange = (event) => {
        setEditorHtml(event);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('access_Token');
            const meetingData = {
                "meeting_id": content.id,
                "min_user": minParticipants,
                "max_user": maxParticipants,
                "meeting_description": editorHtml,
            };
    
            const response = await axios.patch(
                `https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/edit`,
                meetingData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                setModalTitle("");
                setModalMessage("수정되었습니다.");
                setModalIsOpen(true);
            } else {
                setModalTitle("error message");
                setModalMessage((
                    <div style={{ textAlign: 'left' }}>
                    수정에 실패했습니다.<br />
                    잠시 후 시도해주세요.
                    </div>
                ));
                setModalIsOpen(true);
            }
    
        } catch (error) {
            console.error('Error updating meeting:', error);
            setModalTitle("error message");
            if (error.response.status === 401.1) {
                setLoginModalOpen(true);
            }
            else if (error.response.status === 401.2) {
                setModalMessage("모임을 만든 사람만 수정할 수 있습니다.")
                setModalIsOpen(true);
            }
        }
    };

    return (
        <div className='Create_Container'>
            <div className='Left'>
                <div id='Icon' onClick={() => navigate('/home')}></div>
            </div>
            <div className="Center">
                <div className='Content'>
                    <div className='Edit_Title'>
                    <select value={content.category} disabled>
                            <option value="카테고리" disabled>카테고리</option>
                            <option value="eat">Eat</option>
                            <option value="play">Play</option>
                            <option value="study">Study</option>
                            <option value="extra">Extra</option>
                        </select>
                        <input
                            type="text"
                            value={content.meeting_name}
                            readOnly
                        />
                    </div>
                    <div className="margin1"></div>
                    <div className='Option'>
                        <div className="Startdate">
                            <label htmlFor="date">모임 일시</label>
                            <ReadOnlyInput type="datetime-local" id="date" value={formattedMeetingDate} disabled />
                        </div>
                        <div className="margin2"></div>
                        <div className="Enddate">
                            <label htmlFor="limit">크루 모집</label>
                            <ReadOnlyInput type="datetime-local" id="limit" value={formattedDeadline} disabled />
                        </div>
                        <div className="margin2"></div>
                        <div className="Number">
                            <label htmlFor="number">인원</label>
                                <input 
                                    type="number" 
                                    id="minNumber" 
                                    min="2" 
                                    value={minParticipants}
                                    onChange={handleMinParticipantsChange}
                                />
                                <span>~</span>
                                <input 
                                    type="number" 
                                    id="maxNumber" 
                                    min={minParticipants} 
                                    value={maxParticipants}
                                    onChange={handleMaxParticipantsChange}
                                />
                            </div>
                    </div>
                    <div className="margin1"></div>
                    <Write>
                        <ReactQuill
                                ref={editorRef}
                                value={editorHtml}
                                onChange={handleDescriptionChange}
                                modules={EditMeeting.modules}
                                formats={EditMeeting.formats}
                            />
                    </Write>
                </div>
                <div className="margin3"></div>
                <div className='Submit'>
                    <Submitbutton onClick={handleSubmit}>수정하기</Submitbutton>
                </div>
            </div>
            <div className='Right'></div>
            <ModalContainer
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Alert Modal"
                ariaHideApp={false}
            >
                <ModalContent>
                    <ModalTitle>{modalTitle}</ModalTitle>
                    <div>{modalMessage}</div>
                    <ModalButtonContainer>
                        <ModalButton onClick={() => {
                            setModalIsOpen(false);
                            if (modalTitle === "") {
                                navigate(-1);
                            }
                        }}>
                            닫기
                        </ModalButton>
                    </ModalButtonContainer>
                </ModalContent>
            </ModalContainer>
            <ModalContainer
                isOpen={loginModalOpen}
                onRequestClose={() => setLoginModalOpen(false)}
                contentLabel="Login Modal"
                ariaHideApp={false}
            >
                <ModalContent>
                    <div>로그인이 필요합니다.</div>
                    <div>로그인 페이지로 이동하시겠습니까?</div>
                    <ModalButtonContainer>
                        <ModalButton onClick={() => navigate('/login')}>예</ModalButton>
                        <ModalButton onClick={() => navigate(-1)}>아니오</ModalButton>
                    </ModalButtonContainer>
                </ModalContent>
            </ModalContainer>
        </div>
    );
}

EditMeeting.modules = {
    toolbar: [
            [{ 'header': [1, 2, 3, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, {'indent' : '-1'}, {'indent' : '+1'}],
            [{ 'color': [] }, { 'background': [] }],
            [{ align: ["left", "center", "right", "justify"] }],
            ['link', 'image'],
            ['clean'],                                        
    ],
};
    
EditMeeting.formats = [
    'header', 
    'bold', 'italic', 'underline', 'strike', 'blockquote', 
    'list', 'bullet', 'indent',
    'color', 'background', 
    'align', 
    'link', 'image'
]

export default EditMeeting;