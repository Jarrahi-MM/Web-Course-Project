import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from "./components/navbar";
import ProfileImage from "./components/ProfileImage";

function App() {
  return (
      <BrowserRouter>
          <Switch>

              <Route exact path={'/'}>
                  <Navbar/>
              </Route>

              <Route path={'/profile'}>
                  <ProfileImage/>
              </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
