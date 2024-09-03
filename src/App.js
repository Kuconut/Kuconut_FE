
import './App.css';
import Intro from './pages/Intro/Intro';
import Mypage from './pages/Mypage/Mypage'
import Create from './pages/Create/Create'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Forgetpassword from './pages/Forgetpassword/Forgetpassword';
import Detail from'./pages/detail';
import Forgetid from './pages/Forgetid/Forgetid';
import Editpassword from './pages/Editpassword/Editpassword';
import Editnickname from './pages/Editnickname/Editnickname';
import Editemail from './pages/Editemail/Editemail';
import Modal from 'react-modal';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import EditMeeting from './pages/EditMeeting/EditMeeting';

Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter basename = {process.env.PUBLIC_URL}>
      <Routes>
        
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/"  element={<Intro />} />
        {/* <All /> */}
        <Route path="/home"  element={<Detail page = "all" />} />
        {/* <Play /> */}
        <Route path="/home/play" element={<Detail page = "play" />} />
        {/* <Eat /> */}
        <Route path="/home/eat" element={<Detail page = "eat" />} />
        {/* <Study /> */}
        <Route path="/home/study" element={<Detail page = "study" />} />
        {/* <Extra /> */}
        <Route path="/home/extra" element={<Detail page = "extra" />} />
        {/* <Mypage /> */}
        <Route path="/home/mypage" element={<Mypage />} />
        {/* <Create /> */}
        <Route path="/home/create" element={<Create />} />
        {/* <Login /> */}
        <Route path="/login" element={<Login />} />      
        {/* <Signup /> */}
        <Route path="/login/Signup" element={<Signup />} />    
        {/* <Forgetpassword /> */}
        <Route path="/login/Forgetpassword" element={<Forgetpassword />} />    
        {/* <Forgetid /> */}
        <Route path="/login/Forgetid" element={<Forgetid />} />           
        {/* <EditMeeting /> */}
        <Route path="/EditMeeting/:id" element={<EditMeeting />} />        
        {/* <Editpassword /> */}
        <Route path="/home/mypage/Editpassword" element={<Editpassword />} />    
        {/* <Editnickname /> */}
        <Route path="/home/mypage/Editnickname" element={<Editnickname />} />  
        {/* <Editemail /> */}
        <Route path="/home/mypage/Editemail" element={<Editemail />} />  
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
