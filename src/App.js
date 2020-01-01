import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from "./components/navbar";
import Profile from "./components/profile";

function App() {
  return (
      <BrowserRouter>
          <Switch>

              <Route exact path={'/'}>
                  <Navbar/>
              </Route>

              <Route path={'/profile'}>
                  <Profile/>
              </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
