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
            <ProtectedRoute>
            <HomePage />
            </ProtectedRoute>
          </Route>

          <Route path='/pins/newPin' component={NewPin}>
          <ProtectedRoute>
            <NewPin />
            </ProtectedRoute>
          </Route>

          <Route path='/pins/:pinId' component={SinglePin}>
          <ProtectedRoute>

            <SinglePin />
            </ProtectedRoute>

          </Route>

          <Route path='/boards/single/:boardId' component={SingleBoard}>
          <ProtectedRoute>

            <SingleBoard />
            </ProtectedRoute>

          </Route>

          <Route path='/boards/:userId' component={AllBoards}>
          <ProtectedRoute>

            <AllBoards />
            </ProtectedRoute>

          </Route>



          <Route path="/login" >
            <LoginFormPage />
          </Route>



          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exactpath='/' component={SplashPage}/>


        </Switch>
      )}
    </>
  );
}

export default App;
