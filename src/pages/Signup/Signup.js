import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [verify, setVerify] = useState(false);
  const [verifycode, setVerifycode] = useState('');
  const [emailLock, setEmailLock] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // 클라이언트 측 유효성 검사 예시
      if (!email || !id || !password || !nickname) {
        setError('모두 입력해주세요.');
        return;
      }

      /*if (!emailLock) {
        setError("이메일 인증을 하세요.")
        return;
      }*/

      // 서버에 회원가입 요청
      const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Signup', {
        user_id: id,
        password: password,
        email: email,
        nickname: nickname
      });

      if (response.data.message === "이미 존재하는 아이디입니다."){
        setError("이미 존재하는 아이디입니다.")
      }
      else if (response.data.message === "이미 존재하는 닉네임입니다.") {
        setError("이미 존재하는 닉네임입니다.")
      }
      else {
        alert('회원가입 성공!');
        navigate("/login");
      }

    } catch (error) {
      setError('회원가입 실패: 네트워크 오류');
    }
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!(re.test(email))) {
      setError("올바른 이메일 형식이 아닙니다.")
    }
    else {
      setVerify(true);
      setError('');
    }
  }

  const CheckVerifyCode = async(code) => {
    try{
      const response = await axios.post('API 주소', {code});

      if(response.data.success) {
        setEmailLock(true);
        setError('');
      }
      else(
        setError("인증번호가 잘못되었습니다.")
      )
    }
    catch {
      setError("네트워크 오류")
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign up</h2>
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
      <div>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled = {emailLock}
        />
        <button onClick={()=>validateEmail(email)} disabled = {emailLock}>인증</button>
        {verify &&
        <div>
        <input
          type="text"
          id="verifycode"
          value={verifycode}
          onChange={(e)=>setVerifycode(e.target.value)}
          disabled = {emailLock}
        />  
        <button onClick={()=>CheckVerifyCode(verifycode)} disabled = {emailLock}>확인</button>
        </div>}
      </div>
      <div>
        <label htmlFor="nickname">Nickname:</label>
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