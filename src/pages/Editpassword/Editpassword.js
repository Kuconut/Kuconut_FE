import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditPassword = () => {
    const [currentpassword, setCurrentpassword] = useState('');
    const [error, setError] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [verifypassword, setVerifypassword] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        document.body.classList.add('forgetpassword-body');
        return () => {
            document.body.classList.remove('forgetpassword-body');
        };
    }, []);

    const handleChange = () => {
        if(newpassword !== verifypassword) {
            setError('새 비밀번호가 일치하지 않습니다.')
            return;
        }
        const token = localStorage.getItem('access_Token');
        console.log(token)
        console.log(token)
        return axios.patch('https://onboardbe-4cn4h6o76q-du.a.run.app/users/changepwd',
            {
                nowpassword: currentpassword,
                newpassword: newpassword
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }    
            }            
        )
        .then(response => {
            alert('비밀변호 변경')
            navigate('/home/mypage')
        })
        .catch(error => {
            if(error.response.status === 401) {
                setError('현재 비밀번호가 일치하지 않습니다.')
            }
            else if(error.response.status === 403) {
                setError('새 비밀번호가 현재 비밀번호와 일치합니다.')
            }
        })
    }

    return (
    <>
    <div className="login-logo">
        <img src="../../img/logo.jpg" alt="Logo" className="second-logo-image" />
        <button className="second-logo-button" onClick={() => navigate('/')}>OnBoard</button>
    </div>  
        <div className="forget-id-wrapper">
            <div className="forget-id-container">
                <div className="forget-id-group">
                    <label htmlFor="password">현재 비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={currentpassword}
                        onChange={(e) => setCurrentpassword(e.target.value)}
                    />
                </div>
                <div className="forget-id-group">
                    <label htmlFor="password">새 비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={newpassword}
                        onChange={(e) => setNewpassword(e.target.value)}
                    />
                </div>
                <div className="forget-id-group">
                    <label htmlFor="password">새 비밀번호 확인</label>
                    <input
                        type="password"
                        id="password"
                        value={verifypassword}
                        onChange={(e) => setVerifypassword(e.target.value)}
                    />
                </div>
                {error && <p className="forget-id-error">{error}</p>}
            </div>
        </div>
        <button className="change-button" onClick={() => handleChange()}>변경</button>
        <div className="signup-links">
          <button className="transparent-login-button" onClick={() => navigate('/home/mypage')}>← 돌아가기</button>
        </div>
      </>
    );
};

export default EditPassword;