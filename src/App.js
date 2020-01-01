import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from "./components/navbar";
import Post from "./components/Post"

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/post/'}>
                    <Navbar/>
                    <Post postId='0000'/>
                </Route>
                <Route path={'/'}>
                    <Navbar/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
