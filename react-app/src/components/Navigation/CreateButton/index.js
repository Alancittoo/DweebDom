import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function CreateButton() {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      document.addEventListener("click", closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "create-dropdown" + (showMenu ? "" : " hidden");

    return (
      <>
        <p style={{marginLeft:'15px'}} onClick={openMenu}>
          <i className="create-button" /> Create
        </p>
        <ul className={ulClassName} ref={ulRef}>
          <li style={{listStyle:'none',}}>
            <NavLink to="/pins/newPin">Create Pin</NavLink>
          </li>
          <li style={{listStyle:'none'}}>
            <NavLink to="/boards/newBoard">Create Board</NavLink>
          </li>
        </ul>
      </>
    );
  }

  export default CreateButton
