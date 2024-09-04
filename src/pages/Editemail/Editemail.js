import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [verify, setVerify] = useState(false);
    const [verifycode, setVerifycode] = useState('');
    const [emaillock, setEmaillock] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getprofile()

        document.body.classList.add('forgetpassword-body');
        return () => {
            document.body.classList.remove('forgetpassword-body');
        };
    }, []);

    const getprofile = () => {
        const token = localStorage.getItem('access_Token');
        return axios.get('https://onboardbe-4cn4h6o76q-du.a.run.app/users/profile',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setEmail(response.data.email)
        })
        .catch(error => {
            //console.log(error)
        })
    }

    const handleChange = () => {
        const token = localStorage.getItem('access_Token');
        console.log(token)
        return axios.patch('https://onboardbe-4cn4h6o76q-du.a.run.app/users/changeemail',
        {
            password: password,
            email: email,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response)
            alert('변경되었습니다.')
            navigate('/home/mypage')
        })
        .catch(error => {
            console.log(error)
            if(error.status === 401) {
                setError('비밀번호가 틀렸습니다')
            }
            else if(error.status === 403) {
                setError('동일한 이메일입니다.')
            }
        })
    }

    const handleEmailVerification = async () => {
        try {
            const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/SendemailVerify', 
              {
                email: email
              });
              if (response.data.message === '이메일로 인증번호를 전송하였습니다.') {
                setVerify(true);
                setError('');
              } else if (response.data.message === '이미 가입된 이메일입니다.') {
                setError("이미 가입된 이메일입니다.");
              } else setError('이메일 전송 실패');
        } catch (error) {
            setError('이미 가입된 이메일입니다.');
        }
    };

    const handleVerifyCode = async () => {
        try {
            const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Verify', { email: email, verifynumber: verifycode });
      
            if (response.data.message === '인증되었습니다.') {
              alert('인증되었습니다.')
              setEmaillock(true)
              setError('');
            } else (
                setError('인증번호가 만료되었거나 ')
            )
          } catch {
            setError("네트워크 오류");
          }
    };

    return (
      <>
      <div className="https://storage.googleapis.com/onboard_bucket/onboard_logo5.svg">
        <img src="../../img/logo.jpg" alt="Logo" className="second-logo-image" />
        <button className="second-logo-button" onClick={() => navigate('/')}>OnBoard</button>
      </div>  
        <div className="forget-password-wrapper">
            <div className="forget-password-container">
                <div className="forget-password-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={emaillock}
                    />
                </div>
                <div className="forget-password-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={emaillock}
                    />
                    <button onClick={handleEmailVerification} disabled={emaillock}>인증받기</button>
                </div>
                {verify && (
                    <div className="forget-password-group">
                        <label htmlFor="verifycode">인증번호</label>
                        <input
                            type="text"
                            id="verifycode"
                            value={verifycode}
                            onChange={(e) => setVerifycode(e.target.value)}
                            disabled={emaillock}
                        />
                        <button onClick={handleVerifyCode}>확인</button>
                    </div>
                )}
                {error && <p className="forget-password-error">{error}</p>}
            </div>
        </div>
        <button className="change-button" onClick={() => handleChange()} disabled={!emaillock}>변경</button>
        <div className="signup-links">
          <button className="transparent-login-button" onClick={() => navigate('/home/mypage')}>← 돌아가기</button>
        </div>
      </>
    );
};

export default EditEmail;