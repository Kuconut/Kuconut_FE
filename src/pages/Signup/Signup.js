import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [verify, setVerify] = useState(false);
  const [verifycode, setVerifycode] = useState('');
  const [emailLock, setEmailLock] = useState(false);
  const navigate = useNavigate();

  const minLength = 3;
  const maxLength = 20;
  const regex = /^[a-zA-Z][a-zA-Z0-9._-]*$/;
  const forbiddenWords = [];

  const handleSignUp = async () => {
    try {
      if (!email || !id || !password || !nickname) {
        setError('모두 입력해주세요.');
        return;
      }

      if (id.length < minLength || id.length > maxLength) {
        setError('아이디는 3~20글자입니다.');
        return;
      }

      if (!regex.test(id)) {
        setError('아이디는 영문자로 시작해야 하며, 영문자, 숫자, 밑줄(_), 하이픈(-), 마침표(.)만 포함할 수 있습니다');
        return;
      }

      for (let word of forbiddenWords) {
        if (id.toLowerCase().includes(word)) {
          setError('금지된 단어가 포함되어 있습니다.');
          return false;
        }
      }

      if (password.length<8) {
        setError('비밀번호는 8자 이상이어야 합니다.');
        return;
      }

      if (password !== passwordConfirm) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }

      if (!emailLock) {
        setError("이메일 인증을 하세요.");
        return;
      }
      setError('');

      const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Signup', {
        user_id: id,
        password: password,
        email: email,
        nickname: nickname
      });

      if (response.data.message === "이미 존재하는 아이디입니다.") {
        setError("이미 존재하는 아이디입니다.");
      } else if (response.data.message === "이미 존재하는 닉네임입니다.") {
        setError("이미 존재하는 닉네임입니다.");
      } else {
        alert('회원가입 성공!');
        navigate("/login");
      }

    } catch (error) {
      setError('회원가입 실패: 네트워크 오류');
    }
  }

  const validateEmail = async (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(re.test(email))) {
      setError("올바른 이메일 형식이 아닙니다.");
    } else {
      try {
        const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/SendemailVerify', { email });

        if (response.data.message === '이메일로 인증번호를 전송하였습니다.') {
          setVerify(true);
          setError('');
          alert('인증번호를 전송하였습니다.');
        } else if (response.data.message === '이미 가입된 이메일입니다.') {
          setError("이미 가입된 이메일입니다.");
        } else setError('이메일 전송 실패');
      } catch {
        setError('네트워크 오류');
      }
    }
  }

  const CheckVerifyCode = async (code) => {
    try {
      const response = await axios.post('https://onboardbe-4cn4h6o76q-du.a.run.app/auth/Verify', { email: email, verifynumber: verifycode });

      if (response.data.message === '인증되었습니다.') {
        setEmailLock(true);
        setError('');
        alert('인증되었습니다.');
      } else (
        setError("인증번호가 만료되었거나 입력되지 않은 이메일입니다.")
      )
    } catch {
      setError("네트워크 오류");
    }
  }

  return (
    <>
    <div className="signup-wrapper">
      <div className="signup-form">
        <div className="signup-form-group">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="signup-small-button" onClick={() => {/* 중복확인 로직 */}}>중복확인</button>
        </div>
        <div className="signup-form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="nickname">별명</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={emailLock}
          />
          <button className="signup-small-button" onClick={() => validateEmail(email)} disabled={emailLock}>인증받기</button>
        </div>
        {verify && (
          <div className="signup-form-group">
            <label htmlFor="verifycode">인증번호</label>
            <input
              type="text"
              id="verifycode"
              value={verifycode}
              onChange={(e) => setVerifycode(e.target.value)}
              disabled={emailLock}
            />
            <button className="signup-small-button" onClick={() => CheckVerifyCode(verifycode)} disabled={emailLock}>확인</button>
          </div>
        )}
        {error && <p className="signup-error-message">{error}</p>}
      </div>
    </div>
    <div className="signup-links">
        <button className="transparent-login-button" onClick={() => navigate('/Login')}>← 로그인</button>
        <button className="transparent-singup-button" onClick={() => handleSignUp()}>회원가입 →</button>
    </div>
    </>
  );
}

export default SignUp;