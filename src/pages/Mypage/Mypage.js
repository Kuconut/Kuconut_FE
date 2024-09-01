import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Mypage.css';
import { LuPencilLine } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import Modal from 'react-modal';
import Popup from "./popup_detail";
import NewsRow from "./NewsRow";

const Mypage = () => {
    const [activeTab, setActiveTab] = useState('upcoming'); 
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all'); 
    const [articles, setArticles] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [alert, setAlert] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);  // 드롭다운 메뉴 상태

    const navigate = useNavigate();

    // Token 확인 및 리디렉션 처리
    useEffect(() => {
        const token = localStorage.getItem('access_Token');

        if (!token) {
            window.alert('로그인이 필요합니다.');
            navigate('/Login');
            return;
        }

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
    }, [navigate]);

    // 모임 목록 불러오기
    const fetchMeetings = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            let url;
            switch (activeTab) {
                case 'upcoming':
                    url = 'https://onboardbe-4cn4h6o76q-du.a.run.app/users/comingmeeting';
                    break;
                case 'past':
                    url = 'https://onboardbe-4cn4h6o76q-du.a.run.app/users/pastmeeting';
                    break;
                case 'liked':
                    url = 'https://onboardbe-4cn4h6o76q-du.a.run.app/users/likedmeeting';
                    break;
                default:
                    url = 'https://onboardbe-4cn4h6o76q-du.a.run.app/users/comingmeeting';
            }

            const response = await axios.get(url, {
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
        window.open('/home/create', '_blank');
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleProfileEdit = () => {
        navigate('/home/mypage/Editnickname');
    };

    const handleEmailEdit = () => {
        navigate('/home/mypage/Editemail');
    };

    const handlePasswordChange = () => {
        navigate('/home/mypage/Editpassword');
    };

    const handleLogout = () => {
        localStorage.removeItem('access_Token');
        navigate('/login');
    };

    return (
        <div className="mypage-container">
            <div className="side_area">
                <img src="/img/logo.jpg" alt="Homepage Logo" className="logo" onClick={handleLogoClick} />
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
                    <img src="profile.jpg" alt="Profile" className="profile-image" />
                    <span className="nickname">닉네임</span>
                    <div className="actions">
                        <button className="create-btn" onClick={handleCreateClick}><LuPencilLine size={30}/></button>
                        <div className="dropdown-container">
                            <button className="edit-privacy-btn" onClick={handleDropdownToggle}><IoSettingsOutline size={30}/></button>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <button onClick={handleProfileEdit}>프로필 수정</button>
                                    <button onClick={handleEmailEdit}>이메일 수정</button>
                                    <button onClick={handlePasswordChange}>비밀번호 변경</button>
                                    <button onClick={handleLogout}>로그아웃</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <React.Fragment>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('all')}
                        >
                            모든 모임
                        </button>
                        <button
                            className={`filter-btn ${filterType === 'mine' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('mine')}
                        >
                            내가 만든 모임
                        </button>
                        <button
                            className={`filter-btn ${filterType === 'joined' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('joined')}
                        >
                            합류한 모임
                        </button>
                    </div>
                    <div className="meetings">
                        {loading && <p>로딩 중...</p>}
                        {error && <p>오류 발생: {error}</p>}
                        {articles ? (
                            <ul className='listView'>
                                {articles.map((v, inx) => (
                                    <NewsRow auth={true} key={inx} row={v} setmodal={setModalIsOpen} setContent={setContent} setalert={setAlert} />
                                ))}
                            </ul>
                        ) : (
                            <p>No meetings available</p>
                        )}
                    </div>
                </React.Fragment>
            </div>
            <Modal className="PopUp" overlayClassName="Overlay" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <Popup auth={true} content={content} setmodalIsOpen={setModalIsOpen} />
            </Modal>
            <Modal className='alert_Modal' overlayClassName="Overlay" isOpen={alert} onRequestClose={() => setAlert(false)}> 
                <div>로그인이 필요합니다.</div>
                <div>로그인 하시겠습니까?</div>
                <div className="button-container">
                    <button onClick={() => navigate('/login')}>예</button>
                    <button onClick={() => setAlert(false)}>아니요</button>
                </div>
            </Modal>
        </div>
    );
};

export default Mypage;
