import React,{useEffect,useState} from "react";
import axios from "axios";
import './ListView.css';

const NewsRow = (props) => {
    const title = props.row.meeting_name;

    return (
        <button className="list_button"><span className="list_button_text">{title}</span></button>
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
        <ul className='listView'>
        {
            filtered &&
            filtered.map((v, inx) => {
                return <NewsRow key={inx} row={v} />
            })
        }
        </ul>
    );
};

export default ListView;