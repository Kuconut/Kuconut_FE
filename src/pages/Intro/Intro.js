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


  return (

    <div className='Intro'>
      <div className = 'buttons'>
        <button onClick={goToAll}className='button'>All</button>
        <button onClick={goToPlay}className='button'>Play</button>
        <button onClick={goToEat}className='button'>Eat</button>
        <button onClick={goToExtra}className='button'>Extra</button>
        <button onClick={goToStudy}className='button'>Study</button>
      </div>
      
    </div>
  );
}

export default Home;