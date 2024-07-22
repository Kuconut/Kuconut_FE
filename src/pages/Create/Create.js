import React, { useRef } from "react";
import styled from "styled-components";
import Sidebar from '../Sidebar';
import ImageIconSrc from './image_icon.png';

const Container = styled.div`
    display: flex;
`;

const ContentContainer = styled.div`
    flex: 1;
    padding: 20px;
`;

const TitleInput = styled.input`
    width: 60%;
    height: 30px;
    margin-bottom: 30px;
    margin-top: 18px;
    margin-left: 16px;
    text-align: left;

    @media only screen and (max-width: 800px) {
        width: 80%;
    }
    @media only screen and (max-width: 500px) {
        width: 100%;
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
    background-color: rgb(247, 247, 195);
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const Option = styled.div`
    height: 30px;
    background-color: whitesmoke;
    border-top: 1px solid black;
    border-bottom: 1px solid black;

    @media only screen and (max-width: 1100px) {
        height: 50px;
    }
    @media only screen and (max-width: 700px) {
        height: 72px;
    }
`;

const OptionItem = styled.div`
    margin-left: 5px;
`;

const Editor = styled.div`
    flex: 1;
    overflow-y: scroll;
    resize: none;
    border: 1px solid #ccc;
    padding: 10px;
    min-height: 200px;
    text-align: left;
    position: relative;
`;

const Submit = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 5px;
`;

const ImageIcon = styled.img`
    height: 23px;
    width: 23px;
    margin-right: 3px;
    cursor: pointer;
`;

const Create = () => {
    const editorRef = useRef(null);

    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (editorRef.current) {
                    insertImageToEditor(e.target.result);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const insertImageToEditor = (imageSrc) => {
        const editor = editorRef.current;
        const imgTag = `<img src="${imageSrc}" style="width: 100px; height: 100px;" />`;
        editor.innerHTML += imgTag;
    }

    return (
    <Container>
        <Sidebar />
        <ContentContainer>
            <TitleInput type="text" placeholder="제목을 입력하세요" />
            <Page>
                <Write>
                    <Content>
                    <Header>
                        <label htmlFor="imageUpload">
                            <ImageIcon src={ImageIconSrc} alt="Image" />
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            style={{display: 'none'}}
                            onChange={handleImageUpload}
                        />
                    </Header>
                    <Option>
                        <OptionItem>
                        <label htmlFor="date">날짜 </label>
                        <input type="date" id="date" />
                        <label htmlFor="limit">모집 마감 날짜 </label>
                        <input type="date" id="limit" />
                        <label htmlFor="number">참가인원 </label>
                        <input type="number" id="number" />
                        </OptionItem>
                    </Option>
                    {/* <TextArea id="editor" /> */}
                    <Editor contentEditable ref={editorRef} />
                    </Content>
                    <Submit>
                    <button>등록하기</button>
                    </Submit>
                </Write>
            </Page>
            </ContentContainer>
    </Container>
    );
};

export default Create;