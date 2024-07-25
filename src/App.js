
import './App.css';
import Intro from './pages/Intro/Intro';
import Mypage from './pages/Mypage/Mypage'
import Create from './pages/Create/Create'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Forgetpassword from './pages/Forgetpassword/Forgetpassword';
import Detail from'./pages/detail';


import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
