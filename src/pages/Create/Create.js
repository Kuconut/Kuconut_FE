import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import './Create.css';
import Modal from "react-modal";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    }

    .ql-toolbar {
        border: none !important;
        border-bottom: 1px solid #ccc;
        border-radius: inherit;
    }
;`

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

const Create = () => {
    const editorRef = useRef(null);
    const [category, setCategory] = useState("카테고리");
    const [title, setTitle] = useState('');
    const [minNumber, setMinNumber] = useState("");
    const [maxNumber, setMaxNumber] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [editorHtml, setEditorHtml] = useState('');
    const [loginModalOpen, setLoginModalOpen] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_Token');
        if (!token) {
            setLoginModalOpen(true);
        }
    }, []);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleMinNumberChange = (event) => {
        setMinNumber(event.target.value);
    };

    const handleMaxNumberChange = (event) => {
        setMaxNumber(event.target.value);
    };

    const validateNumbers = () => {
        const min = parseFloat(minNumber);
        const max = parseFloat(maxNumber);

        setModalTitle("error message");

        if (title.trim() === '') {
            setModalTitle("error message");
            setModalMessage("제목을 입력해주세요.");
            setModalIsOpen(true);
            return false;
        }

        if (min < 2) {
            setModalMessage("최소 인원은 2명 이상이어야 합니다.");
            setModalIsOpen(true);
            return false;
        }
        if (max < min) {
            setModalMessage("최대 인원은 최소 인원보다 적을 수 없습니다.");
            setModalIsOpen(true);
            return false;
        }
        if (!min) {
            setModalMessage("최소 인원을 설정해주세요.")
            setModalIsOpen(true);
            return false;
        }
        if (!max) {
            setModalMessage("최대 인원을 설정해주세요.")
            setModalIsOpen(true);
            return false;
        }
        if (!Number.isInteger(min) || !Number.isInteger(max)) {
            setModalMessage("올바른 숫자를 입력해주세요.");
            setModalIsOpen(true);
            return false;
        }

        return true;
    };

    const handleSubmit = () => {
        if (validateNumbers()) {
            setModalTitle("");
            setModalMessage("등록되었습니다.");
            setModalIsOpen(true);
        }
    };

    return (
        <div className='Create_Container'>
            <div className='Left'>
                <div id='Icon'></div>
            </div>
            <div className="Center">
                <div className='Content'>
                    <div className='Title'>
                        <select value={category} onChange={handleCategoryChange}>
                            <option value="카테고리" disabled>카테고리</option>
                            <option value="eat">Eat</option>
                            <option value="play">Play</option>
                            <option value="study">Study</option>
                            <option value="extra">Extra</option>
                        </select>
                        <input
                            type="text"
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="margin1"></div>
                    <div className='Option'>
                        <div className="Startdate">
                            <label htmlFor="date">모임 일시</label>
                            <input type="datetime-local" id="date" />
                        </div>
                        <div className="margin2"></div>
                        <div className="Enddate">
                            <label htmlFor="limit">크루 모집</label>
                            <input type="datetime-local" id="limit" />
                        </div>
                        <div className="margin2"></div>
                        <div className="Number">
                            <label htmlFor="minNumber">인원</label>
                                <input 
                                    type="number" 
                                    id="minNumber" 
                                    placeholder="최소" 
                                    min="2" 
                                    value={minNumber}
                                    onChange={handleMinNumberChange}
                                />
                                <span>~</span>
                                <input 
                                    type="number" 
                                    id="maxNumber" 
                                    placeholder="최대" 
                                    min="2" 
                                    value={maxNumber}
                                    onChange={handleMaxNumberChange}
                                />
                            </div>
                    </div>
                    <div className="margin1"></div>
                    <Write>
                        <ReactQuill
                                ref={editorRef}
                                value={editorHtml}
                                onChange={setEditorHtml}
                                modules={Create.modules}
                                formats={Create.formats}
                                placeholder="내용을 입력하세요"
                            />
                    </Write>
                </div>
                <div className="margin3"></div>
                <div className='Submit'>
                    <Submitbutton onClick={handleSubmit}>모임 만들기</Submitbutton>
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
                        <ModalButton onClick={() => setModalIsOpen(false)}>닫기</ModalButton>
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

Create.modules = {
    toolbar: [
            [{ 'header': [1, 2, 3, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, {'indent' : '-1'}, {'indent' : '+1'}],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean'],                                        
    ],
};
    
Create.formats = [
    'header', 
    'bold', 'italic', 'underline', 'strike', 'blockquote', 
    'list', 'bullet', 'indent',
    'color', 'background', 
    'align', 
    'link', 'image'
]

export default Create;