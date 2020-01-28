import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile";
import EditProfile from "./components/editProfile";
import Post from "./components/posts/Post"
import Homepage from "./components/Homepage";
import AlertsPage from "./components/alerts/AlertsPage";
import {CookiesProvider} from "react-cookie";

function App() {
    return (
        <BrowserRouter>
            <CookiesProvider>
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
                    <Route path={'/alerts'}>
                        <AlertsPage/>
                    </Route>
                </Switch>
            </CookiesProvider>
        </BrowserRouter>
    );
}

export default App;
