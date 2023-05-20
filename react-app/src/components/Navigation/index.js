import React, { useState } from 'react';
import { NavLink, } from 'react-router-dom';
import { useSelector, } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [showLoginModal, setShowLoginModal] = useState()

	const handleHomeClick = () => {
		if (!sessionUser) {
			setShowLoginModal(true);
		}
	}

	return (
		<ul>
			{/* <li onClick={handleHomeClick}>
				<NavLink exact to="/home">Home</NavLink>
				{showLoginModal && <LoginFormModal />}
			</li> */}
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
