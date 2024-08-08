import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forgetid.css';
import { useNavigate } from 'react-router-dom';

const ForgetId = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [verify, setVerify] = useState(false);
    const [verifycode, setVerifycode] = useState('');
    const [emaillock, setEmaillock] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('forgetid-body');
        return () => {
            document.body.classList.remove('forgetid-body');
        };
    }, []);

    const handleEmailVerification = async () => {
        try {
            const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/SendemailForgotId', 
              { 
                email: email
              });
            if (response.data.message === '이메일로 인증번호를 전송하였습니다.') {
                setVerify(true);
                setEmaillock(true);
                setError('');
            } 
            else if (response.data.message === '가입되지 않은 이메일입니다.') {
                setError('가입되지 않은 이메일입니다.')
            }
        } catch (error) {
            setError('네트워크 오류');
        }
    };

    const handleVerifyCode = async () => {
        try {
            const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/ForgotId',
                { 
                    email: email,
                    verifynumber: verifycode 
                });
            if(response.data.message === '인증번호가 만료되었거나 입력되지 않은 이메일입니다.') {
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
        }
    };

    return (
      <>
        <div className="forget-id-wrapper">
            <div className="forget-id-container">
                <div className="forget-id-group">
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
                    <div className="forget-id-group">
                        <label htmlFor="verifycode">인증번호</label>
                        <input
                            type="text"
                            id="verifycode"
                            value={verifycode}
                            onChange={(e) => setVerifycode(e.target.value)}
                        />
                        <button onClick={handleVerifyCode}>확인</button>
                    </div>
                )}
                {error && <p className="forget-id-error">{error}</p>}
            </div>
        </div>
        <button className="transparent-login-button" onClick={() => navigate('/Login')}>← 로그인</button>
      </>
    );
};

export default ForgetId;