import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Mypage.css';
import { LuPencilLine } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { format } from 'date-fns';
import Popup from '../popup_detail';

const Mypage = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_Token');

        if (!token) {
            window.alert('로그인이 필요합니다.');
            navigate('/Login');
            return;
        } else {
            axios.get('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Checktoken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status !== 200) {
                    window.alert('로그인 상태가 올바르지 않습니다. 다시 로그인해주세요.');
                    navigate('/Login');
                }
            })
            .catch(() => {
                window.alert('로그인 상태가 올바르지 않습니다. 다시 로그인해주세요.');
                navigate('/Login');
            });
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('access_Token');
        if (!token) return;

        axios.get('https://onboardbe-4cn4h6o76q-du.a.run.app/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => {
            console.error('프로필 정보 가져오기 실패:', error);
        });
    }, []);

    const fetchMeetings = useCallback(async () => {
        setLoading(true);
        setError(null);
    
        const token = localStorage.getItem('access_Token');
        if (!token) return;
    
        try {
            let url;
            switch (activeTab) {
                case 'upcoming':
                    url = 'https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/my/comingmeeting';
                    break;
                case 'past':
                    url = 'https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/my/pastmeeting';
                    break;
                case 'liked':
                    url = 'https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/my/likedmeeting';
                    break;
                default:
                    url = 'https://onboardbe-4cn4h6o76q-du.a.run.app/meeting/my/comingmeeting';
            }
    
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { type: filterType }
            });
    
            setMeetings(response.data);
        } catch (error) {
            setError('Error fetching meetings: ' + error.message);
        } finally {
            setLoading(false);
        }
    }, [activeTab, filterType]);

    useEffect(() => {
        fetchMeetings();
    }, [activeTab, filterType, fetchMeetings]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setFilterType('all');
    };

    const handleFilterClick = (type) => {
        setFilterType(type);
    };

    const handleLogoClick = () => {
        navigate('/home');
    };

    const handleCreateClick = () => {
        navigate('/home/create');
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleProfileEdit = () => {
        navigate('/home/editnickname');
    };

    const handleEmailEdit = () => {
        navigate('/home/editemail');
    };

    const handlePasswordChange = () => {
        navigate('/home/editpassword');
    };

    const handleLogout = () => {
        localStorage.removeItem('access_Token');
        navigate('/login');
    };

    const openPopup = (meeting) => {
        setSelectedMeeting(meeting);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedMeeting(null);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    if (loading) {
        return <div>Loading meetings...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mypage-container">
            <div className="side_area">
                <img src="https://storage.googleapis.com/onboard_bucket/onboard_logo5.svg" alt="Homepage Logo" className="logo" onClick={handleLogoClick} />
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
                        className={`tab ${activeTab === 'liked' ? 'active' : ''}`}
                        onClick={() => handleTabClick('liked')}
                    >
                        찜한 모임
                    </button>
                </div>
            </div>

            <div className="main_area">
                <div className="profile-section">
                    <img src={userData.profile_image} alt="Profile" className="mypage-profile-image" />
                    <span className="nickname">{userData.nickname}</span>
                    <div className="actions">
                        <button className="create-btn" onClick={handleCreateClick}><LuPencilLine size={40}/></button>
                        <div className="mypage-dropdown-container">
                            <button className="edit-privacy-btn" onClick={handleDropdownToggle}><IoSettingsOutline size={40}/></button>
                            {dropdownOpen && (
                                <div className="mypage-dropdown-menu">
                                    <button onClick={handleProfileEdit}>프로필 수정</button>
                                    <button onClick={handleEmailEdit}>이메일 수정</button>
                                    <button onClick={handlePasswordChange}>비밀번호 변경</button>
                                    <button onClick={handleLogout}>로그아웃</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {activeTab !== 'liked' && (
                    <div className="mypage-filter-buttons">
                        <button
                            className={`mypage-filter-btn ${filterType === 'all' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('all')}
                        >
                            모든 모임
                        </button>
                        <button
                            className={`mypage-filter-btn ${filterType === 'mine' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('mine')}
                        >
                            내가 만든 모임
                        </button>
                        <button
                            className={`mypage-filter-btn ${filterType === 'joined' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('joined')}
                        >
                            합류한 모임
                        </button>
                    </div>
                )}

                <div className="mypage-meetings">
                    {meetings.length > 0 ? (
                        meetings.map(meeting => (
                            <div key={meeting.id} className="meeting-item" onClick={() => openPopup(meeting)}>
                                <img src={meeting.created_by.profile_image} alt="Profile" className="meeting-profile-image" />
                                <div className="info">
                                    <h3>{meeting.meeting_name}</h3>
                                    <p>{meeting.created_by.nickname} |&nbsp;
                                    {format(new Date(meeting.meeting_date), 'yy.MM.dd HH:mm')} |&nbsp;
                                    ~{format(new Date(meeting.deadline), 'yy.MM.dd HH:mm')} |&nbsp;
                                    {meeting.user_count}/{meeting.max_user}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No meetings found.</div>
                    )}
                </div>
            </div>

            {isPopupOpen && (
                <Popup
                    auth={!!userData} // Check if user data exists for authentication status
                    content={selectedMeeting}
                    setmodalIsOpen={closePopup} // Pass the function to close the popup
                    setContent={setSelectedMeeting}
                />
            )}
        </div>
    );
};

export default Mypage;
