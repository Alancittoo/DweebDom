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
						<NavLink to="/home" className='navbar-home-button' style={{fontWeight:'bold', color:'black'}} onClick={handleHomeClick}>Home</NavLink>
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
				<a href='https://github.com/Alancittoo' target='_blank'>
				<button style={{border:'none', backgroundColor:'white'}}><i style={{marginRight:'1px', marginBottom:'3px', scale:'1.9', marginLeft:'1px'}} class="fa-brands fa-github"></i></button>
				</a>
				<a href='https://www.linkedin.com/in/alan-echenique/' target='_blank'>
				<button style={{border:'none', backgroundColor:'white'}}><i style={{marginRight:'10px', marginBottom:'3px', scale:'1.9', marginLeft:'1px'}} class="fa-brands fa-linkedin"></i></button>
				</a>
				{isLoaded && <ProfileButton user={sessionUser} />}
			</div>


		</nav>
	);
}

export default Navigation;
