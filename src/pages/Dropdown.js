import React, { useState,useEffect,useRef } from "react";
import './ListView.css'
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

const Dropdown = (props) => {
    const [open,setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <div className="dropdown-container" ref={dropdownRef}>
            
            <button className="search-button" onClick={() => setOpen(!open)}>
                {open ? <IoMdArrowDropup size={24} color="1C4696"/>:<IoMdArrowDropdown size={24} color="1C4696"/>}
            </button>
            {open && (
                <div className="dropdown-menu">
                    {props.children}
                </div>
            )}
        </div>
    );
}

export default Dropdown