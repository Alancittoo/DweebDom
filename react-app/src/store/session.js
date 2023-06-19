// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_PROFILE_USER = "session/SET_PROFILE_USER"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const setProfileUser = (user) => ({
	type: SET_PROFILE_USER,
	payload: user,
});


const initialState = {
	user: null,
	profileUser: null
 };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password, fname, lname) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			first_name: fname,
			last_name: lname
		}),
	});

	if (response.ok) {
		console.log('IT WORKED', {
			username,
			email,
			password,
			first_name: fname,
			last_name: lname
		})
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		console.log('not WORKED', {
			username,
			email,
			password,
			first_name: fname,
			last_name: lname
		})
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		console.log('DID NOT WORKED', {
			username,
			email,
			password,
			first_name: fname,
			last_name: lname
		})
		return ["An error occurred. Please try again."];
	}
};

export const thunkGetUserById = (userId) => async (dispatch) => {
	const res = await fetch(`/api/auth/user/${userId}`);

	if (res.ok) {
		const user = await res.json();
		dispatch(setProfileUser(user));
		console.log(res, 'THUNK GET USER BY ID SUCCESS')
		console.log(user, "THUNK GET USER BY ID USER INFO")
		return user
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		case SET_PROFILE_USER:
			return { ...state, profileUser: action.payload };
		case REMOVE_USER:
			return { ...state, user: null };
		default:
			return state;
	}
}
