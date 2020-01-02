import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Post from "./components/Post"
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
                <Route path={'/'}>
                    <Homepage/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
