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
import Editor from "./components/posts/Editor";
import PostCard from "./components/posts/PostCard";
import EditorModal from "./components/posts/EditorModal";
import {Button} from "semantic-ui-react";
import {openModal} from "./redux/action_creators/modalActions";
import FollowList from "./components/followList";


class App extends Component {
    constructor(props) {
        super(props);
        if ((!props.cookies.get('myToken') || props.cookies.get('myToken').length < 15) && !window.location.href.endsWith('login'))
            window.location.href = window.location.origin + '/login';
        this.props.loadTokenAndUsernameFromCookies(this.props.cookies);
        this.state = {
            token: props.cookies.get('myToken'),
            username: props.cookies.get('userName'),
        };
    }

    render() {
        return (
            <BrowserRouter>
                <CookiesProvider>
                    <Route path={'/'}>
                        <Navbar/>
                        <EditorModal/>
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
                        <Route path='/followList/:username' render={({match}) => {
                            return (
                                <div>
                                    <FollowList username={match.params.username}/>
                                </div>
                            );
                        }}/>
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

                        <Route path={'/fortest_editor'}>
                            <Editor/>
                        </Route>
                        <Route path={'/fortest_postcard'}>
                            <PostCard/>
                        </Route>
                        <Route path={'/fortest_modal'}>
                            <Button
                                onClick={()=>this.props.openModal(
                                    'comment_create',
                                    {supCommentId:25},
                                )}
                            >hiie</Button>
                        </Route>,
                    </Switch>
                </CookiesProvider>
            </BrowserRouter>
        );
    }

}

const mapStateToProps = (state) => ({
    token: state.auth.authorization,
})

export default connect(mapStateToProps, {loadTokenAndUsernameFromCookies,openModal})(withCookies(App));
