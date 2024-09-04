import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Editnickname.css';
import { MdOutlineCameraAlt } from "react-icons/md";


const EditNickname = () => {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getprofile();
        document.body.classList.add('editnickname-body');
        return () => {
            document.body.classList.remove('editnickname-body');
        };
    }, []);

    const handleChange = async () => {
        const token = localStorage.getItem('access_Token');

        try {
            const response = await axios.patch('https://onboardbe-4cn4h6o76q-du.a.run.app/users/updatenick',
                { nickname },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response)
            navigate('/home/mypage');
        } catch {
            setError('별명을 변경하세요');
        }
    };

    const getprofile = () => {
        const token = localStorage.getItem('access_Token');
        return axios.get('https://onboardbe-4cn4h6o76q-du.a.run.app/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setNickname(response.data.nickname);
                setImage(response.data.profile_image);
            })
            .catch(error => {
                console.log(error);
                setError('사용할 수 없는 별명입니다.');
            });
    };

    const handleImageChange = async (inp) => {
        const formData = new FormData();
        formData.append('profile', inp.files[0]);
        const token = localStorage.getItem('access_Token');

        try {
            const response = await axios.patch('https://onboardbe-4cn4h6o76q-du.a.run.app/users/photo', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setImage(response.data.profile_image);
        } catch { }
    };

    return (
        <>
            <div className="edit-logo">
                <img src="https://storage.googleapis.com/onboard_bucket/onboard_logo5.svg" alt="Logo" className="second-logo-image" />
                <button className="edit-logo-button" onClick={() => navigate('/')}>OnBoard</button>
            </div>
            <div className="edit-nickname-wrapper">
                <div className="edit-profile-image">
                    <img src={image} alt="profile_image" className="asdf-profile-image" />
                    <label className="edit-camera-icon">
                        <input
                            type="file"
                            accept="image/jpg, image/jpeg, image/png"
                            onChange={(e) => handleImageChange(e.target)}
                            style={{ display: 'none' }}
                        />
                        <MdOutlineCameraAlt style={{border: 'none'}}/>
                    </label>
                </div>
                <div className="edit-nickname-container">
                    <div className="edit-nickname-group">
                        <label htmlFor="nickname">별명</label>
                        <input
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>
                    {error && <p className="edit-nickname-error">{error}</p>}
                </div>
                <button className="edit-change-button" onClick={handleChange}>수정</button>
            </div>
            <div className="edit-back-link">
                <button className="transparent-back-button" onClick={() => navigate('/home/mypage')}>← 돌아가기</button>
            </div>
        </>
    );
};

export default EditNickname;