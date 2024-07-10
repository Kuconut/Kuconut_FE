import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
    try {
        const response = await axios.post('API주소', {
        username: id,
        password: password
        });
        if(response.data.success) navigate('/');
        else setError('Wrong ID or Password');

    } catch (error) {
        setError('Error');
    }
    }

    return (
    <>
    <div className="login-container">
        <h2>Login</h2>
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
        <label htmlFor="password">Password:</label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
    </div>
    <button className="transparent-button" onClick={() => navigate('/Login/Signin')}>Sign in</button>
    <button className="transparent-button" onClick={() => navigate('/Login/Forgetpassword')}>Forget Password?</button>
    </>
    );
}

export default Login;