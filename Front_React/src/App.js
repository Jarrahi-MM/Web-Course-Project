import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Profile from "./components/profile";
import EditProfile from "./components/editProfile";
import Post from "./components/posts/Post"
import Homepage from "./components/Homepage";

function App() {
  return (
      <BrowserRouter>
          <Route path={'/'}>
              <Navbar/>
          </Route>
          <Switch>
              <Route path='/post/:postId' render={({match}) => {
                  return (
                      <div>
                          <Post postId={match.params.postId}/>
                      </div>
                  );
              }}/>
              <Route exact path={'/'}>
                  <Homepage/>
              </Route>
              <Route path={'/profile'}>
                  <Profile/>
              </Route>
              <Route path={'/editProfile'}>
                  <EditProfile/>
              </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
