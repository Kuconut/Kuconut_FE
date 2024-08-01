import React, { useRef, useState } from "react";
import styled from "styled-components";
import Sidebar from '../Sidebar';
import Modal from "react-modal";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Container = styled.div`
    display: flex;
`;

const ContentContainer = styled.div`
    flex: 1;
    padding: 20px;
`;

const CategorySelect = styled.select`
    width: 15%;
    height: 30px;
    margin-left: 16px;
    margin-bottom: 30px;
    margin-top : 18px;

    @media only screen and (max-width: 800px) {
        width: 10%;
    }
`;

const TitleInput = styled.input`
    width: 60%;
    height: 30px;
    margin-bottom: 30px;
    margin-top: 18px;
    margin-left: 16px;
    text-align: left;

    @media only screen and (max-width: 800px) {
        width: 75%;
    }
`;

const Page = styled.div`
    display: flex;
    flex-direction: row;
`;

const Write = styled.div`
    width: 90%;
    height: 75vh;
    margin-left: 16px;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    height: 70vh;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    height: 25px;
    background-color: skyblue;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const Option = styled.div`
    height: 30px;
    background-color: white;
    border-top: 1px solid black;
    border-bottom: 1px solid black;

    @media only screen and (max-width: 1050px) {
        height: 50px;
    }
    @media only screen and (max-width: 735px) {
        height: 72px;
    }
    @media only screen and (max-width: 663px) {
        height: 120px;
    }
    @media only screen and (max-width: 660px) {
        height: 50px;
    }
    @media only screen and (max-width: 555px) {
        height: 72px;
    }
`;

const OptionItem = styled.div`
    display: flex;
    margin-left: 5px;
    justify-content: space-around;

    label {
        margin-right: 5px;
    }
    
    input[type="number"] {
        width: 40px;
    }

    input[type="datetime-local"] {
        width: 180px;
    }

    @media only screen and (max-width: 660px) {
        input[type="datetime-local"] {
            width: 100px;
        }
    }
`;

const Startdate = styled.div`
    align-items: center;
`;

const Enddate = styled.div`
    align-itmes: center;
`;

const NumberInputContainer = styled.div`
    align-items: center;

    & > *:not(:last-child) {
        margin-right: 5px;
    }
`;

const Editor = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .ql-toolbar {
        flex-shrink: 0;
    }

    .ql-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
        
    .ql-editor {
        flex: 1;
        min-height: 350px;
        overflow-y: scroll;
    }
`;

const Submit = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 5px;
`;

const ModalContainer = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    }
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
`;

const ModalTitle = styled.h2`
    text-align: left;
    margin-bottom: 7px;
    font-size: 15px;
`;

const ModalButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ModalButton = styled.button`
    margin-top: 20px;
`;

const Create = () => {
    const editorRef = useRef(null);
    const [category, setCategory] = useState("카테고리");
    const [minNumber, setMinNumber] = useState("");
    const [maxNumber, setMaxNumber] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [editorHtml, setEditorHtml] = useState('');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

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

        if (min < 1) {
            setModalMessage("최소 인원은 1명 이상이어야 합니다.");
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
    <Container>
        <Sidebar />
        <ContentContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <CategorySelect value={category} onChange={handleCategoryChange}>
                    <option value="카테고리" disabled>카테고리</option>
                    <option value="eat">Eat</option>
                    <option value="play">Play</option>
                    <option value="study">Study</option>
                    <option value="extra">Extra</option>
                </CategorySelect>
                <TitleInput type="text" placeholder="제목을 입력하세요" />
            </div>            
            <Page>
                <Write>
                    <Content>
                    <Header>
                    </Header>
                    <Option>
                        <OptionItem>
                        <Startdate>
                            <label htmlFor="date">날짜 </label>
                            <input type="datetime-local" id="date" />
                        </Startdate>
                        <Enddate>
                            <label htmlFor="limit">모집 마감 날짜 </label>
                            <input type="datetime-local" id="limit" />
                        </Enddate>
                            <NumberInputContainer>
                            <label htmlFor="minNumber">참가인원 </label>
                                <input 
                                    type="number" 
                                    id="minNumber" 
                                    placeholder="최소" 
                                    min="1" 
                                    value={minNumber}
                                    onChange={handleMinNumberChange}
                                />
                                <span>~</span>
                                <input 
                                    type="number" 
                                    id="maxNumber" 
                                    placeholder="최대" 
                                    min="1" 
                                    value={maxNumber}
                                    onChange={handleMaxNumberChange}
                                />
                            </NumberInputContainer>
                        </OptionItem>
                    </Option>
                    <Editor>
                        <ReactQuill
                            ref={editorRef}
                            value={editorHtml}
                            onChange={setEditorHtml}
                            modules={Create.modules}
                            formats={Create.formats}
                            placeholder="내용을 입력하세요"
                        />
                    </Editor>
                    </Content>
                    <Submit>
                    <button onClick={handleSubmit}>등록하기</button>
                    </Submit>
                </Write>
            </Page>
        </ContentContainer>
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
    </Container>
    );
};

Create.modules = {
    toolbar: [
            [{ 'header': [1, 2, 3, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, {'indent' : '-1'}, {'indent' : '+1'}],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']                                         
        ],
    };
    
    Create.formats = [
        'header', 
        'bold', 'italic', 'underline', 'strike', 'blockquote', 
        'list', 'bullet', 'indent',
        'color', 'background', 
        'align', 
        'link', 'image'
    ];

export default Create;