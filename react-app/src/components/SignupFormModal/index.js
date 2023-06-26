import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [fname, setFName] = useState("")
	const [lname, setLName] = useState("")
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let newErrors = [];
		const emailRegEx = /\S+@\S+\.\S+/;
		if (!emailRegEx.test(email)) {
			newErrors.push('Please provide a valid email.');
		}
		if (password !== confirmPassword) {
			newErrors.push("Confirm Password field must be the same as the Password field");
		}
		if (newErrors.length > 0) {
			setErrors(newErrors);
			return;
		}
		if (password === confirmPassword) {
			// console.log({
			// 	username,
			// 	email,
			// 	password,
			// 	first_name: fname,
			// 	last_name: lname
			// })
			const data = await dispatch(signUp(username, email, password, fname, lname));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field1",
			]);
		}
	};

	return (
		<div className="signup-container">
			<h1 className="signup-main-text">Sign Up for Dweebdom 🤓</h1>
			<form className='signup-form' onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
					<input
						type="text"
						value={email}
						style={{marginLeft:'112px'}}
						className="signup-form-input"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						className="signup-form-input"
						style={{marginLeft:'79px'}}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					First Name
					<input
						type="fname"
						className="signup-form-input"
						value={fname}
						style={{marginLeft:'75px'}}
						onChange={(e) => setFName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="lname"
						value={lname}
						className="signup-form-input"
						style={{marginLeft:'78px'}}
						onChange={(e) => setLName(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						className="signup-form-input"
						value={password}
						style={{marginLeft:'87px'}}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						className="signup-form-input"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>

				<button style={{marginLeft:'85px'}} className="signup-button" type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
