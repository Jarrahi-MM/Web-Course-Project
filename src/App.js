import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import EditProfile from "./components/editProfile";

function App() {
  return (
      <BrowserRouter>
          <Switch>

              <Route exact path={'/'}>
                  <Navbar/>
              </Route>

              <Route path={'/profile'}>
                  <Navbar/>
                  <Profile/>
              </Route>
              <Route path={'/editProfile'}>
                  <Navbar/>
                  <EditProfile/>
              </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
