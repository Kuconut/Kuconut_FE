
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './Intro.css';

const Home = () => {
  const navigate = useNavigate();

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
    <div className='Container'>
      <div className='Intro'>
        <div id='Icon'></div>
        <h1 id='Intro-Title'>OnBoard</h1>
        <span id='Login' onClick={goToLogin}>로그인/회원가입</span>
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
