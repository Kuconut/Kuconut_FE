import React,{useEffect,useState} from "react";
import axios from "axios";
import './ListView.css';

const NewsRow = (props) => {
    const title = props.row.meeting_name;

    return (
        <button className="list_button"><span className="list_button_text">{title}</span></button>
    );  
};

const ListView = ({type}) => {

    const [articles, setArticles] = useState(null);

    useEffect(() => {
        console.log(`Fetching data for type: ${type}`);

        axios.get(`https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/type${type}`)
        .then((response) => {
            setArticles(response.data);
            console.log(response.data);
        })
        .catch(response=> {
            console.log(response.message);
        });
    }, [type]);

    return (
        <ul className='listView'>
        {
            articles &&
            articles.map((v, inx) => {
                return <NewsRow key={inx} row={v} />
            })
        }
        </ul>
    );
};

export default ListView;