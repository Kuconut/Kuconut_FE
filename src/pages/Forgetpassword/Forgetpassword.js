import React, { useState } from 'react';
import axios from 'axios';
import './Forgetpassword.css';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [verify, setVerify] = useState(false);
    const [verifycode, setVerifycode] = useState('');
    const [emailLock, setEmailLock] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailVerification = async () => {
        try {
            const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/SendemailVerify', { email });
            if (response.data.message === '이메일로 인증번호를 전송하였습니다.') {
                setVerify(true);
                setError('');
            } else {
                setError('이메일 전송 실패');
            }
        } catch (error) {
            setError('네트워크 오류');
        }
    };

    const handleVerifyCode = async () => {
        try {
            const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Verify', { email: email, verifynumber: verifycode });
            if (response.data.message === '인증되었습니다.') {
                setEmailLock(true);
                setError('');
                setPassword(response.data.password); // 비밀번호 받기
            } else {
                setError('인증번호가 잘못되었습니다.');
            }
        } catch (error) {
            setError('네트워크 오류');
        }
    };

    return (
        <>
        <div className="forget-password-container">
            <h2>Forget Password</h2>
            <div>
                <label htmlFor="id">ID:</label>
                <input
                    type="text"
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">이메일:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={emailLock}
                />
                <button onClick={handleEmailVerification} disabled={emailLock}>인증</button>
                {verify && (
                    <div>
                        <input
                            type="text"
                            id="verifycode"
                            value={verifycode}
                            onChange={(e) => setVerifycode(e.target.value)}
                            disabled={emailLock}
                        />
                        <button onClick={handleVerifyCode} disabled={emailLock}>확인</button>
                    </div>
                )}
            </div>
            {password && (
                <div>
                    <label>당신의 비밀번호는:</label>
                    <p>{password}</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <button className="transparent-button" onClick={() => navigate('/Login')}>Log in</button>
        </>
    );
};

export default ForgetPassword;