import React, { useState, useEffect } from 'react';
import './Mypage.css';

const Mypage = () => {
  const [view, setView] = useState('upcoming');
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    // Mock API call
    let data;
    switch (view) {
      case 'upcoming':
        data = [{ id: 1, name: 'Upcoming Meeting 1' }, { id: 2, name: 'Upcoming Meeting 2' }];
        break;
      case 'past':
        data = [{ id: 3, name: 'Past Meeting 1' }, { id: 4, name: 'Past Meeting 2' }];
        break;
      case 'bookmarked':
        data = [{ id: 5, name: 'Bookmarked Meeting 1' }, { id: 6, name: 'Bookmarked Meeting 2' }];
        break;
      default:
        data = [];
    }
    setMeetings(data);
  }, [view]);

  return (
    <div className="container">
      <div className="sidebar_area">
        <button className="button" onClick={() => setView('upcoming')}>다가오는 모임</button>
        <button className="button" onClick={() => setView('past')}>지난 모임</button>
        <button className="button" onClick={() => setView('bookmarked')}>찜한 모임</button>
      </div>
      <div className="main_area">
        <div className="profile">
          <img src="https://via.placeholder.com/50" alt="Profile" />
          <h3>Nickname</h3>
        </div>
        <div className="nav-buttons">
          <button className="button">Edit Privacy</button>
          <button className="button">Main Page</button>
        </div>
        <div>
          {meetings.map(meeting => (
            <div key={meeting.id}>{meeting.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
