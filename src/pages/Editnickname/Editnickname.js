import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditNickname = () => {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        getprofile()
        document.body.classList.add('forgetpassword-body');
        return () => {
            document.body.classList.remove('forgetpassword-body');
        };
    }, []);

    const handleChange = async() => {

        console.log(image)
        const token = localStorage.getItem('access_Token');

        try{
            const response = await axios.patch('https://onboardbe-4cn4h6o76q-du.a.run.app/users/updatenick',
                {
                    nickname: nickname,
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                },
            )
            console.log('asdf')
            console.log(response)
            navigate('/home/mypage')
        }
        catch{
            setError('별명을 변경하세요')
        }
    }


    const getprofile = () => {
        const token = localStorage.getItem('access_Token');
        return axios.get('https://onboardbe-4cn4h6o76q-du.a.run.app/users/profile',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setNickname(response.data.nickname)
            setImage(response.data.profile_image)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleImageChange = async (inp) => {
        const formData = new FormData();
        formData.append('profile',inp.files[0]);
        const token = localStorage.getItem('access_Token');

        try {
            const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/users/photo',formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }            
            })
            setImage(response.profile_image)
        }
        catch{
        }
    }

    return (
      <>
      <div className="login-logo">
        <img src="../../img/logo.jpg" alt="Logo" className="second-logo-image" />
        <button className="second-logo-button" onClick={() => navigate('/')}>OnBoard</button>
      </div>  
        <div className="forget-password-wrapper">
            <div className='profile_image'>
                <img src={image} alt="profile_image" className='profile_image' />
            </div>
            <div className="image_input">
                <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={(e) => handleImageChange(e.target)}
                />
            </div>
            <div className="forget-password-container">
                <div className="forget-password-group">
                    <label htmlFor="email">별명</label>
                    <input
                        type="email"
                        id="email"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                {error && <p className="forget-password-error">{error}</p>}
            </div>
        </div>
        <button className="change-button" onClick={() => handleChange()}>별명 변경</button>
      </>
    );
};

export default EditNickname;