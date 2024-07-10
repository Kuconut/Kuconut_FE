import React from "react";
import { NavLink, useLocation, useNavigate} from "react-router-dom";

import { IoPerson } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";


import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import "../App.css";


const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
`
const Row = styled.div`
    flex-direction:row;
`
const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
`

function Sidebar() {

    const navigate = useNavigate();

    const goToMypage = () => {
        navigate("/home/mypage");
      }
    const goToCreate = () => {
        navigate("/home/create");
    }

    const pathName = useLocation().pathname;

    const menus = [
        { name: "All", path: "/home" },
        { name: "Eat", path: "/home/eat" },
        { name: "Play", path: "/home/play" },
        { name: "Study", path: "/home/study"},
        { name: "Extra", path: "/home/extra"},
    ];

    return (
        <Side>
        <Row>
            <button onClick = {goToMypage} className="side_button"><IoPerson/></button>
            <button onClick = {goToCreate} className="side_button"> <LuPencilLine/></button>
        </Row>
        
        <Menu>
            {menus.map((menu, index) => {
            return (
                <NavLink
                exact
                style={ pathName === menu.path? {color : "black",fontWeight:"bold",textDecoration:"none"}:{color:"gray",textDecoration:"none"}}
                to={menu.path}
                key={index}
                >
                <SidebarItem
                    menu={menu}
                />
                </NavLink>
            );
            })}
        </Menu>
        </Side>
    );
}

export default Sidebar;