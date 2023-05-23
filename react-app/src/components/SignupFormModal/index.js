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
			console.log({
				username,
				email,
				password,
				first_name: fname,
				last_name: lname
			})
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
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
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
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					First Name
					<input
						type="fname"
						value={fname}
						onChange={(e) => setFName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="lname"
						value={lname}
						onChange={(e) => setLName(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>

				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
