import React from "react";
import { NavLink, useLocation,useNavigate} from "react-router-dom";

import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import "../App.css";


const Side = styled.div`
  display: flex;
  border-right: 1px solid #EEEEEE;
  background-color : #EEEEEE;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
`

const Menu = styled.div`
  margin-top: 30px;
  width: 20vw;
  display: flex;
  flex-direction: column;
`

function Sidebar() {

    const navigate = useNavigate();
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
            <button onClick={() => navigate('/home')} className="side-logo-button"><img className  = "side-logo" alt = "logo" src = "https://storage.googleapis.com/onboard_bucket/onboard_logo5.svg"/></button>
        <Menu>
            {menus.map((menu, index) => {
            return (
                <NavLink
                exact
                style={ pathName === menu.path? {color : "blue",fontWeight:"bold",textDecoration:"underline"}:{color:"#444444",textDecoration:"none"}}
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