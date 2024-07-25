import React, { useState, useEffect } from 'react';

const profileData = {
  username: '사용자명',
  profilePictureUrl: '프로필_사진_URL',
};

const mockMeetings = [
  { id: 1, title: '모임 1' },
  { id: 2, title: '모임 2' },
  { id: 3, title: '모임 3' },
];

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    // 프로필 데이터 가져오기 (가정: 비동기 요청)
    // 백엔드 API 호출로 대체해야 함
    setTimeout(() => {
      setProfile(profileData);
    }, 500); // 1초 후에 프로필 데이터 설정

    // 모임 목록 데이터 가져오기 (가정: 비동기 요청)
    // 백엔드 API 호출로 대체해야 함
    setTimeout(() => {
      setMeetings(mockMeetings);
    }, 1000); // 1.5초 후에 모임 목록 설정
  }, []);

  return (
    <div>
      {/* 프로필 섹션 */}
      {profile ? (
        <div>
          <img src={profile.profilePictureUrl} alt="프로필 사진" />
          <p>{profile.username}</p>
        </div>
      ) : (
        <p>프로필을 불러오는 중...</p>
      )}

      {/* 모임 목록 섹션 */}
      <div>
        <h2>모임 목록</h2>
        <ul>
          {meetings.map((meeting) => (
            <li key={meeting.id}>{meeting.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;