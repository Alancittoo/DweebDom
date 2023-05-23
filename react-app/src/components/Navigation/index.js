import React, { useState } from 'react';
import { NavLink, } from 'react-router-dom';
import { useSelector, } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import CreateButton from './CreateButton';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [showLoginModal, setShowLoginModal] = useState();

	const handleHomeClick = () => {
		if (!sessionUser) {
			setShowLoginModal(true);
		}
	}

	return (
		<nav className="navigation">
			<div className="nav-left">
				<img className="nav-logo" src='https://media.istockphoto.com/id/1333688503/vector/nerd-geek-boy-icon-design-template-illustration.jpg?s=612x612&w=0&k=20&c=RrQssmQmkerQxu_Nn6w9xAJ5SfGnBggKTOMgCg-jqxQ=' alt='logo' />
				{sessionUser &&
					<>
						<NavLink to="/home" onClick={handleHomeClick}>Home</NavLink>
						<div className="create-button-container">
							<CreateButton />
						</div>
					</>
				}
			</div>

			<div className="nav-center">
				<input type="text" placeholder="Search..." />
			</div>

			<div className="nav-right">
				{isLoaded && <ProfileButton user={sessionUser} />}
			</div>
		</nav>
	);
}

export default Navigation;
