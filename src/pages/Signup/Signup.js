import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      // 클라이언트 측 유효성 검사 예시
      if (!email || !username || !password || !nickname) {
        setError('모두 입력해주세요.');
        return;
      }

      // 이메일 형식 검사 예시 (간단한 형식만 검사)
      if (!validateEmail(email)) {
        setError('올바른 이메일 형식이 아닙니다.');
        return;
      }

      // 서버에 회원가입 요청
      const response = await axios.post('http://example.com/api/signup', {
        email,
        username,
        password,
        nickname
      });

      if (response.data.success) {
        alert('회원가입 성공!');
        // 로그인 페이지로 이동 또는 다른 작업 수행
      } else {
        setError('회원가입 실패: 서버 오류');
      }

    } catch (error) {
      setError('회원가입 실패: 네트워크 오류');
    }
  }

  const validateEmail = (email) => {
    // 간단한 이메일 형식 검사
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  return (
    <div className="signup-container">
      <h2>Sign up</h2>
      <div>
        <label htmlFor="username">ID:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <div>
        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="nickname">닉네임:</label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSignUp}>Sign up</button>
    </div>
  );
}

export default SignUp;