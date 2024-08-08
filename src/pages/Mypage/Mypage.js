import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Mypage.css';

const Mypage = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate();

    const checkAuthentication = async () => {
      try {
          const response = await axios.get('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Checktoken');
          if (response.status !== 200) {
              navigate('/Login');
          }
      } catch (error) {
          navigate('/Login');
          window.alert('로그인이 필요합니다.');
      }
  };

  useEffect(() => {
      checkAuthentication();
  }, []);

    const handleTabClick = async (tab) => {
      setActiveTab(tab);

      try {
          let response;
          if (tab === 'upcoming') {
              response = await axios.get('https://onboardbe-4cn4h6o76q-du.a.run.app/users/mademeeting/all'); //api 수정필요 - 현재 내가 만든 모든 모임 api
          } else if (tab === 'past') {
              response = await axios.get('https://onboardbe-4cn4h6o76q-du.a.run.app/users/postedmeeting/all'); //api 수정필요 - 현재 내가 가입한 모든 모임 api
          } else if (tab === 'saved') {
              response = await axios.get('https://onboardbe-4cn4h6o76q-du.a.run.app/users/likedmeeting'); 
          }

          if (response) {
              setMeetings(response.data);
          }
      } catch (error) {
          console.error('Error fetching meetings:', error);
      }
  };

    const handleLogoClick = () => {
      navigate('/'); // 메인 페이지로 이동
  };

    return (
        <div className="mypage-container">
            <div className="side_area">
                <img src="/img/logo.jpg" alt="Homepage Logo" className="logo" onClick={handleLogoClick}/>
                <div className="tabs">
                    <button 
                        className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                        onClick={() => handleTabClick('upcoming')}
                    >
                        다가오는 모임
                    </button>
                    <button 
                        className={`tab ${activeTab === 'past' ? 'active' : ''}`}
                        onClick={() => handleTabClick('past')}
                    >
                        지난 모임
                    </button>
                    <button 
                        className={`tab ${activeTab === 'saved' ? 'active' : ''}`}
                        onClick={() => handleTabClick('saved')}
                    >
                        찜한 모임
                    </button>
                </div>
            </div>
            <div className="main_area">
                <div className="profile-section">
                    <img src="profile.jpg" alt="Profile" className="profile-image" />
                    <span className="nickname">닉네임</span>
                    <div className="actions">
                        <button className="create-btn">Create</button>
                        <button className="edit-privacy-btn">Edit Privacy</button>
                    </div>
                </div>
                <div className="meeting-list">
                    <div className="filter-buttons">
                        <button className="filter-btn">모든 모임</button>
                        <button className="filter-btn">내가 만든 모임</button>
                    </div>
                    <div className="meetings">
                        {/* 모임 목록을 화면에 표시 */}
                        {meetings.length > 0 ? (
                            meetings.map((meeting) => (
                                <div key={meeting.id} className="meeting-item">
                                    <h3>{meeting.title}</h3>
                                    <p>{meeting.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No meetings available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mypage;