import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const Home = () => {
  const navigate = useNavigate();

  const goToPlay = () => {
    navigate("/Play");
  }

  const goToEat = () => {
    navigate("/Eat");
  }

  const goToExtra = () => {
    navigate("/Extra");
  }

  const goToStudy = () => {
    navigate("/Study");
  }

  return (
    <div className='Home'>
      <button onClick={goToPlay}className='button'>Play</button>
      <button onClick={goToEat}className='button'>Eat</button>
      <button onClick={goToExtra}className='button'>Extra</button>
      <button onClick={goToStudy}className='button'>Study</button>
    </div>
  );
}

export default Home;