import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/AllPins/HomePage";
import NewPin from "./components/CreatePin";
import SinglePin from "./SinglePin";
import AllBoards from "./components/AllBoards";
import SingleBoard from "./components/SingleBoard";
import SplashPage from "./SplashPage";
import ProtectedRoute from "./components/auth/ProtectedRoute"
import UserProfile from "./components/Users";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>



<ProtectedRoute path='/home' component={HomePage} />
    <ProtectedRoute path='/pins/newPin' component={NewPin} />
    <ProtectedRoute path='/pins/:pinId' component={SinglePin} />
    <ProtectedRoute path='/boards/single/:boardId' component={SingleBoard} />
    <ProtectedRoute path='/boards/:userId' component={AllBoards} />
    <ProtectedRoute path='/user/:userId' component={UserProfile} />
    <Route path="/login" component={LoginFormPage} />
    <Route path="/signup" component={SignupFormPage} />
    <Route exact path='/' component={SplashPage} />

        </Switch>
      )}
    </>
  );
}

export default App;
