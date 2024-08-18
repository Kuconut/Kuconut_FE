import React, { useState,useEffect,useRef } from "react";
import './ListView.css'


const Dropdown = ({iconOpen,iconClose,children}) => {
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
                {open ? iconOpen:iconClose}
            </button>
            {open && (
                <div className="dropdown-menu">
                    {children}
                </div>
            )}
        </div>
    );
}

export default Dropdown