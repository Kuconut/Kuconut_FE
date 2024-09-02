
import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import '../../App.css';
import './Intro.css';

const Home = () => {
  const navigate = useNavigate();
  const [auth,setAuth] = useState(false);

  useEffect(() => {
    const access_Token = localStorage.getItem('access_Token');
    const refresh_Token = localStorage.getItem('refresh_Token');
    axios.get(`https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Checktoken`,{
        headers:{
            Authorization: `Bearer ${access_Token}`
        }
    })
    .then((response) => {
        if(response.status === 200){
            setAuth(true);
        }else{
            console.log(response.status);
            axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Refresh',{
                refreshToken : refresh_Token
            })
            .then((response) =>{
                if(response.status === 200){
                    localStorage.setItem('access_Token', response.data.access_token);   
                    localStorage.setItem('refresh_Token', response.data.refresh_token);
                    setAuth(true);       
                }else{
                    setAuth(false)
                }
            })
            .catch((error) =>{
                console.log(error);
                setAuth(false);
            })
            setAuth(false);
        }
    })
    .catch((response) => {
        console.log(response);
        setAuth(false);
    });
}, []);

  const goToAll = () => {
    navigate("/home");
  }

  const goToPlay = () => {
    navigate("/home/play");
  }

  const goToEat = () => {
    navigate("/home/eat");
  }

  const goToStudy = () => {
    navigate("/home/study");
  }

  const goToExtra = () => {
    navigate("/home/extra");
  }

  const goToLogin = () => {
    navigate("/login");
  }


  return (
    <div className='Intro_Container'>
      <div className='Intro'>
        <div id='Intro-Icon'></div>
        <h1 id='Intro-Title'>OnBoard</h1>
        {auth?(
                    <>
                    </>
                    ):(
                      <span id='Login' onClick={goToLogin}>로그인/회원가입</span>
                    )}
      </div>

      <div className='Information'>
        <div id='Text'>
          <div className='text'>암벽 등반부터 맛집 탐방까지,</div>
          <div className='text'>함께 세상을 항해할</div>
          <div className='text'>크루를 찾아보세요</div>
        </div>
        <div id='List'>
          <div className='card'>방탈출 크루 구합니다</div>
          <div className='card'>민주광장에서 치킨 먹을 사람!</div>
          <div className='card'>같이 토익 스피킹 연습해요</div>
        </div>
      </div>

      <div className='Buttons'>
        <button onClick={goToAll} id='button'>all</button>
        <button onClick={goToPlay} id='button'>play</button>
        <button onClick={goToEat} id='button'>eat</button>
        <button onClick={goToStudy} id='button'>study</button>
        <button onClick={goToExtra} id='button'>etc</button>
      </div>
    </div>
  );
}

export default Home;
