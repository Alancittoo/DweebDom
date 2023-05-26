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
        if (ulRef.current && !ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      document.addEventListener("click", closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "create-dropdown" + (showMenu ? "" : " hidden");

    return (
      <>
        <p style={{marginLeft:'15px', fontWeight:'bold'}} onClick={openMenu}>
          <i  className="create-button" /> Create<i style={{marginLeft:'5px', marginTop:'3px'}} class="fa-solid fa-angle-down"></i>
        </p>
        <ul className={ulClassName} ref={ulRef}>
          <li style={{listStyle:'none',}}>
            <NavLink to="/pins/newPin" style={{fontWeight:'bold', color:'black'}} onClick={() => setShowMenu(false)}>Create Pin</NavLink>
          </li>
          <li style={{listStyle:'none'}}>
            <NavLink to="/boards/newBoard" style={{fontWeight:'bold', color:'black'}} onClick={() => setShowMenu(false)}>Look at Your Boards</NavLink>
          </li>
        </ul>
      </>
    );
  }

  export default CreateButton
