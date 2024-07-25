import React,{useEffect,useState} from "react";
import Modal from 'react-modal';
import axios from "axios";
import Popup from "./popup_detail"
import moment from "moment";
import './ListView.css';
import { CiHeart } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";

const NewsRow = ({row,setmodal,setContent}) => {
    const title = row.meeting_name;
    const meeting_date = moment(new Date(row.meeting_date)).format("YYYY.MM.DD HH:mm:ss");
    const deadline = moment(new Date(row.deadline)).format("YYYY.MM.DD HH:mm:ss");

    return (
        <div className="List-box">
            <IoPerson/>
            <button className="List-button" onClick={() => {setmodal(true); setContent(row);}}>
                <span className="list_button_text">
                    {title}
                </span>
                <span className="list_button_text" style={{color: "gray"}}>
                    {meeting_date} | {deadline} | {row.user_count}/{row.max_user}
                </span>
            </button>
            <button><CiHeart size={24}/></button>
        </div>

    );  
};
function compareDates(date1, date2) {
    // Date 객체로 변환
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    // 밀리초 단위로 변환하여 비교
    if (d1.getTime() < d2.getTime()) {
        return -1; // date1이 date2보다 우선
    } else if (d1.getTime() > d2.getTime()) {
        return 1; // date2가 date1보다 우선
    } else {
        return 0; // 두 날짜가 동일함
    }
}

const ListView = ({type,keyword,sort}) => {

    const [articles, setArticles] = useState(null);
    const [filtered,setFiltered] = useState(null);

    const [modalIsOpen,setmodalIsOpen] = useState(false);
    const [content, setContent] = useState(null);

    useEffect(() => {
        console.log(`Fetching data for type: ${type}`);

        axios.get(`https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/type${type}`)
        .then((response) => {
            let sortedData = response.data;
            sortedData = response.data.sort((a,b)=>compareDates(a[sort],b[sort]));
            setArticles(sortedData);
            console.log(sortedData);
        })
        .catch(response=> {
            console.log(response.message);
        });
    }, [type,sort]);
    
    useEffect(() => {
        if(keyword){
            setFiltered(articles.filter((meetingdata) => meetingdata.meeting_name.toLowerCase().includes(keyword.toLowerCase())));
        }else{
            setFiltered(articles);
        }
        
      
    }, [keyword,articles]);

    return (
        <>
            <ul className='listView'>
            {
                filtered &&
                filtered.map((v, inx) => {
                    return <NewsRow key={inx} row={v} setmodal = {setmodalIsOpen} setContent ={setContent}/>
                })
            }
            </ul>
            <Modal className= "PopUp"  overlayClassName="Overlay" isOpen = {modalIsOpen} onRequestClose={() => setmodalIsOpen(false)}>
                <Popup content = {content} setmodalIsOpen = {setmodalIsOpen}/>
            </Modal>
        </>
        
    );
};

export default ListView;