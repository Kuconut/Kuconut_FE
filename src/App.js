
import './App.css';
import Intro from './pages/Intro/Intro';
import Eat from './pages/Eat/Eat';
import Extra from './pages/Extra/Extra';
import Play from './pages/Play/Play';
import Study from './pages/Study/Study';
import Home from './pages/Home/Home';
import Mypage from './pages/Mypage/Mypage'
import Create from './pages/Create/Create'
import Login from './pages/Login/Login';
import Signin from './pages/Signin/Signin';
import Forgetpassword from './pages/Forgetpassword/Forgetpassword';


import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/" element={<Intro />} />
        {/* <All /> */}
        <Route path="/home" element={<Home />} />
        {/* <Play /> */}
        <Route path="/home/play" element={<Play />} />
        {/* <Eat /> */}
        <Route path="/home/eat" element={<Eat />} />
        {/* <Study /> */}
        <Route path="/home/study" element={<Study />} />
        {/* <Extra /> */}
        <Route path="/home/extra" element={<Extra />} />
        {/* <Mypage /> */}
        <Route path="/home/mypage" element={<Mypage />} />
        {/* <Create /> */}
        <Route path="/home/create" element={<Create />} />
        {/* <Login /> */}
        <Route path="/login" element={<Login />} />      
        {/* <Signin /> */}
        <Route path="/login/Signin" element={<Signin />} />    
        {/* <Forgetpassword /> */}
        <Route path="/login/Forgetpassword" element={<Forgetpassword />} />            
        </Routes>
    </BrowserRouter> 
  );
}

export default App;
