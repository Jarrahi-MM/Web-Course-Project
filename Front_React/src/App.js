import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
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
import Channel from "./components/channel/channel";
import CreateChannel from "./components/channel/createChannel";
import FollowList from "./components/followList";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.cookies.get('myToken'),
            username: props.cookies.get('userName'),
        };
    }

    componentDidMount() {
        this.props.loadTokenAndUsernameFromCookies(this.props.cookies);
        // console.log(this.state.token);
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
                        <Route path='/post/:channelId/:postNum' render={({match}) => {
                            return (
                                <div>
                                    <Post channelId={match.params.channelId} postNum={match.params.postNum}
                                          username={this.state.username} token={this.state.token}/>
                                </div>
                            );
                        }}/>
                        <Route exact path={'/'}>
                            <Homepage/>
                        </Route>
                        <Route path='/profile/:username' render={({match}) => {
                            return (
                                <div>
                                    <Profile username={match.params.username}/>
                                </div>
                            );
                        }}/>
                        <Route path={'/followList'}>
                            <FollowList/>
                        </Route>
                        <Route path={'/createChannel'}>
                            <CreateChannel/>
                        </Route>
                        <Route path={'/channel'}>
                            <Channel/>
                        </Route>
                        <Route path={'/createChannel'}>
                            <Channel/>
                        </Route>
                        <Route path='/editProfile/:username' render={({match}) => {
                            return (
                                <div>
                                    <EditProfile username={match.params.username}/>
                                </div>
                            );
                        }}/>
                        <Route path={'/alerts'}>
                            <AlertsPage/>
                        </Route>
                    </Switch>
                </CookiesProvider>
            </BrowserRouter>
        );
    }

}

const mapStateToProps = (state) => ({
    token: state.auth.authorization,

})

export default connect(mapStateToProps, {loadTokenAndUsernameFromCookies})(withCookies(App));
