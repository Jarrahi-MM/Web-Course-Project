import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/Profile/profile";
import EditProfile from "./components/Profile/editProfile";
import Post from "./components/posts/Post"
import Homepage from "./components/Homepage";
import AlertsPage from "./components/alerts/AlertsPage";
import Login from "./components/Login"
import {CookiesProvider, withCookies} from "react-cookie";
import {connect} from "react-redux";
import {loadTokenAndUsernameFromCookies} from "./redux/action_creators/authActions";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.cookies.get('myToken'),
            username: '',
        };
    }

    componentDidMount() {
        this.props.loadTokenAndUsernameFromCookies(this.props.cookies);
    }

    render() {
        return (
            <BrowserRouter>
                <CookiesProvider>
                    <Route path={'/'}>
                        <Navbar/>
                    </Route>
                    <Route path={'/login'}>
                        <Login/>
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
                        <Route path='/profile/:username' render={({match}) => {
                            return (
                                <div>
                                    <Post username={match.params.username}/>
                                </div>
                            );
                        }}/>
                        <Route path={'/followList'}>
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

}

export default connect(null,{loadTokenAndUsernameFromCookies})(withCookies(App));
