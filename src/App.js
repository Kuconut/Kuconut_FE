import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import Eat from './pages/Eat/Eat';
import Extra from './pages/Extra/Extra';
import Play from './pages/Play/Play';
import Study from './pages/Study/Study';

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/" element={<Home />} />
        {/* <Play /> */}
        <Route path="/play" element={<Play />} />
        {/* <Eat /> */}
        <Route path="/eat" element={<Eat />} />
        {/* <Study /> */}
        <Route path="/study" element={<Study />} />
        {/* <Extra /> */}
        <Route path="/extra" element={<Extra />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
