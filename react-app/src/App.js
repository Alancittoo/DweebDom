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



          <Route path='/home' component={HomePage}>
            <HomePage />
          </Route>

          <Route path='/pins/newPin' component={NewPin}>
            <NewPin />
          </Route>

          <Route path='/pins/:pinId' component={SinglePin}>
            <SinglePin />
          </Route>

          <Route path='/boards/:userId' component={AllBoards}>
            <AllBoards />
          </Route>

          <Route path="/login" >
            <LoginFormPage />
          </Route>



          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exactpath='/' />


        </Switch>
      )}
    </>
  );
}

export default App;
