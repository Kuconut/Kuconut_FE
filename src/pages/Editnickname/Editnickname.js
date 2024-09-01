import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditNickname = () => {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    const [profile, setProfile] = useState('');
    useEffect(() => {
        getprofile()

        document.body.classList.add('forgetpassword-body');
        return () => {
            document.body.classList.remove('forgetpassword-body');
        };
    }, []);

    const handleChange = () => {

    }

    const getprofile = () => {
        const token = localStorage.getItem('access_Token');
        return axios.get('https://onboardbe-4cn4h6o76q-du.a.run.app/users/profile',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setProfile(response.data)
            setNickname(response.data.nickname)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleEmailVerification = async () => {
        /*try {
            const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/SendemailForgotPassword', 
              { user_id: id,
                email: email
              });
            if (response.data.message === '이메일로 인증번호를 전송하였습니다.') {
                setVerify(true);
                setEmaillock(true);
                setError('');
            } 
            else if(response.data.message === '아이디가 일치하지 않습니다.') {
                setError('아이디가 일치하지 않습니다.');
            }
            else if (response.data.message === '가입되지 않은 이메일입니다.') {
                setError('가입되지 않은 이메일입니다.')
            }
        } catch (error) {
            setError('네트워크 오류');
        }*/
    };

    const handleVerifyCode = async () => {
        /*try {
            const response = await axios.patch('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/ForgotPassword',
              { user_id: id,
                email: email,
                verifynumber: verifycode });
            if(response.data.message === '아이디가 일치하지 않습니다.') {
              setError('아이디가 일치하지 않습니다.')
            }
            else if(response.data.message === '인증번호가 만료되었거나 입력되지 않은 이메일입니다.') {
              setError('인증번호가 만료되었거나 입력되지 않은 이메일입니다.')
            }
            else if(response.data.message === '인증번호가 일치하지 않습니다.') {
              setError(response.data.message);
            }
            else {
              alert(response.data.message)
              navigate('/login')
            }
        } catch (error) {
            setError('네트워크 오류');
        }*/
    };

    const handleImageChange = () => {
        
    }

    return (
      <>
      <div className="login-logo">
        <img src="../../img/logo.jpg" alt="Logo" className="second-logo-image" />
        <button className="second-logo-button" onClick={() => navigate('/')}>OnBoard</button>
      </div>  
        <div className="forget-password-wrapper">
            <div className="image">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.value)}
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
        <button className="change-button" onClick={() => handleChange()}>변경</button>
      </>
    );
};

export default EditNickname;