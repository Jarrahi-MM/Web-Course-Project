import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import EditProfile from "./components/editProfile";
import Post from "./components/Post";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path='/post/:postId' render={({match}) => {
                  return (
                      <div>
                          <Navbar/>
                          <Post postId={match.params.postId}/>
                      </div>
                  );
              }}/>
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
