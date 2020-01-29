import React, {Component} from "react";
import {withCookies} from "react-cookie";

class Login extends Component {
    constructor(probs) {
        super(probs);
        this.state = {
            loginCredentials: {'username': '', 'password': ''},
            signInCredentials: {'username': '', 'password': '', 'firstName': '', 'lastName': '', 'email': ''}
        }
    }

    changeLoginCred = event => {
        let credentials = this.state.loginCredentials;
        credentials[event.target.name] = event.target.value;
        this.setState({loginCredentials: credentials});
    };

    changeSignInCred = event => {
        let credentials = this.state.signInCredentials;
        credentials[event.target.name] = event.target.value;
        this.setState({signInCredentials: credentials});
    };

    login = () => {
        fetch(`http://127.0.0.1:8000/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.credentials)
        }).then(response => response.json())
            .then(response => {
                this.props.cookies.set('myCookie', response.token);
                window.location.href = '/';
            })
            .catch(error => {
            });
    };

    render() {
        return (
            <div className="ui placeholder segment">
                <div className="ui stackable very relaxed two column grid">
                    <div className="column">
                        <form className="ui form">
                            <div className="field">
                                <label>Username</label>
                                <div className="ui left icon input">
                                    <input type="text" placeholder="Username" name='username' onChange={this.changeLoginCred}/>
                                    <i aria-hidden="true" className="user icon"/>
                                </div>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <div className="ui left icon input">
                                    <input type="password" name='password' onChange={this.changeLoginCred}/>
                                    <i aria-hidden="true" className="lock icon"/>
                                </div>
                            </div>
                            <button className="ui primary button" onClick={this.login}>Login</button>
                        </form>
                    </div>
                    <div className="column">
                        <form className="ui form">
                            <div className="field">
                                <label>Username</label>
                                <div className="ui left icon input">
                                    <input type="text" placeholder="Username" name='username' onChange={this.changeLoginCred}/>
                                    <i aria-hidden="true" className="user icon"/>
                                </div>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <div className="ui left icon input">
                                    <input type="password" name='password' onChange={this.changeLoginCred}/>
                                    <i aria-hidden="true" className="lock icon"/>
                                </div>
                            </div>
                            <button className="ui primary button" onClick={this.login}>Login</button>
                        </form>
                    </div>
                </div>
                <div className="ui vertical divider">Or</div>
            </div>
        )
    }

}

export default withCookies(Login);