import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from "./components/navbar";
import Post from "./components/Post"

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
                <Route path={'/'}>
                    <Navbar/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
