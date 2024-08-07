import React,{useEffect,useState} from "react";
import Modal from 'react-modal';
import axios from "axios";
import Popup from "./popup_detail"
import { useNavigate } from "react-router-dom";
import './ListView.css';
import NewsRow from "./NewsRow";




const ListView = ({type,keyword,search_key,sort}) => {

    const [articles, setArticles] = useState(null);

    const [modalIsOpen,setmodalIsOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [alert,setalert] = useState(false);

    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    

    useEffect(() => {
        const token = localStorage.getItem('access_Token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        console.log(`Fetching data for type: ${type}`);
        console.log(search_key);
        console.log(keyword);
        setLoading(true);

        axios.get(`https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/type${type}`,{params : {"searchtype" : search_key,"keyword": keyword}, headers: headers })
        .then((response) => {
            setArticles(response.data);
            setLoading(false);
            console.log(response.data);
        })
        .catch(response=> {
            console.log(response.message);
            setLoading(false);
        });
    }, [type,sort,keyword,search_key]);


    return (
        <>
            {loading ? (
                <div className='loading'>Loading...</div> // 로딩 중일 때 표시할 내용
            ) : (
                <ul className='listView'>
                    {articles && articles.map((v, inx) => {
                        return <NewsRow key={inx} row={v} setmodal={setmodalIsOpen} setContent={setContent} setalert = {setalert} />
                    })}
                </ul>
            )}
            <Modal className="PopUp" overlayClassName="Overlay" isOpen={modalIsOpen} onRequestClose={() => setmodalIsOpen(false)}>
                <Popup content={content} setmodalIsOpen={setmodalIsOpen} />
            </Modal>
            <Modal className = 'alert_Modal'overlayClassName="Overlay" isOpen ={alert} onRequestClose={() => setalert(false)}> 
                <div>로그인이 필요합니다.</div>
                <div>로그인 하시겠습니까?</div>
                <div className="button-container">
                    <button onClick={() => navigate('/login')}>예</button>
                    <button onClick={() => setalert(false)}>아니요</button>
                </div>
                
            </Modal>
        </>
        
    );
};

export default ListView;