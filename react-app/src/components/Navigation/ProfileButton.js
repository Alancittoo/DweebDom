import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()
  const currentUser = useSelector(state => state.session.user);


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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/")
    closeMenu()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <p style={{cursor:'pointer', marginRight:'5px'}} onClick={openMenu}>
        <i style={{marginRight:'25px', marginBottom:'3px', marginLeft:'15px', scale:'1.5'}} className="fas fa-user-circle" />
      </p>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Welcome {user.username}</li>
            <li>{user.email}</li>
            <NavLink to={`/user/${currentUser.id}`}><button className='logout-button' style={{marginRight: "5px", marginTop: "25px"}}>My Profile</button></NavLink>

            <li>
            <NavLink to={`/`}><button className='logout-button' onClick={handleLogout} style={{marginLeft: "2px",}}>Log Out</button></NavLink>
            </li>
          </>
        ) : (
          <>
            <div className='initial-login-button'>
            <OpenModalButton
              buttonText="Log In"
              onButtonClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            </div>

            <div className="initial-signup-button">
            <OpenModalButton
              buttonText="Sign Up"
              onButtonClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
