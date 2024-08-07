import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {  
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('login-body');
        return () => {
            document.body.classList.remove('login-body');
        };
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Signin', {
                user_id: id,
                password: password
            });
            if (response.data.message === "아이디 또는 비밀번호를 확인해주세요.") setError('아이디 또는 비밀번호를 확인해주세요.');
            else {
                const token = response.data.access_Token;
                localStorage.setItem('access_Token', token);   
                navigate('/home');
            }
        } catch (error) {
            setError('Error');
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-logo">
                <img src="img/logo.jpg" alt="Logo" className="logo-image" />
                <button className="logo-button" onClick={() => navigate('/')}>OnBoard</button>
            </div>
            <div className="login-container">
                <div>
                    <input
                        type="text"
                        id="id"
                        placeholder="아이디"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button onClick={handleLogin}>로그인</button>
            </div>
            <div className="login-links">
                <button className="login-transparent-button" onClick={() => navigate('/Login/Signup')}>회원가입</button>
                <button className="login-transparent-button" onClick={() => navigate('/Login/Forgetpassword')}>비밀번호 찾기</button>
            </div>
        </div>
    );
}

export default Login;