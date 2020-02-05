import React, {Component} from "react";
import {withCookies} from "react-cookie";
import {loadTokenAndUsernameFromCookies} from "../redux/action_creators/authActions";
import {connect} from "react-redux";

class Login extends Component {
    constructor(probs) {
        super(probs);
        this.state = {
            loginCredentials: {'username': '', 'password': ''},
            signUpCredentials: {'username': '', 'password': '', 'first_name': '', 'last_name': '', 'email': ''},
            loginError: '',
            signUpError: ''
        }
    }

    changeLoginCred = event => {
        let credentials = this.state.loginCredentials;
        credentials[event.target.name] = event.target.value;
        this.setState({loginCredentials: credentials});
    };

    changeSignUpCred = event => {
        let credentials = this.state.signUpCredentials;
        credentials[event.target.name] = event.target.value;
        this.setState({signUpCredentials: credentials});
    };

    Login = (event) => {
        event.preventDefault();
        fetch(`http://127.0.0.1:8000/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.loginCredentials)
        }).then(response => response.json())
            .then(response => {
                this.props.cookies.set('myToken', response.token);
                this.props.cookies.set('userName', this.state.loginCredentials.username);
                if (response.token){
                    this.props.loadTokenAndUsernameFromCookies(this.props.cookies);
                    window.location.href = window.location.origin + '/';
                }
                else {
                    this.setState({loginError: "Unable to login"});
                    this.setState({signUpError: ""});
                    console.log(response);
                }
            })
            .catch(error => {
                this.setState({loginError: "Error"});
                this.setState({signUpError: ""});
            });
    };

    SignUp = (event) => {
        event.preventDefault();
        fetch(`http://127.0.0.1:8000/api1/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.signUpCredentials)
        }).then(response => response.json())
            .then(response => {
                this.props.cookies.set('myToken', response.token);
                this.props.cookies.set('userName', this.state.signUpCredentials.username);
                if (response.token)
                    window.location.href = window.location.origin + '/';
                else {
                    this.setState({loginError: ""});
                    this.setState({signUpError: "Not Valid"});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({loginError: ""});
                this.setState({signUpError: "Error"});
            });
    };

    render() {
        return (
            <div className="ui placeholder segment">
                <div className="ui stackable very relaxed two column grid">
                    <div className="column">
                        <form className="ui error form" onSubmit={this.Login}>
                            <div className="field">
                                <label>Username</label>
                                <div className="ui left icon input">
                                    <input required type="text" placeholder="Username" name='username'
                                           onChange={this.changeLoginCred}/>
                                    <i aria-hidden="true" className="user icon"/>
                                </div>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <div className="ui left icon input">
                                    <input required type="password" name='password' onChange={this.changeLoginCred}/>
                                    <i aria-hidden="true" className="lock icon"/>
                                </div>
                            </div>
                            <div className="ui error message" hidden={!this.state.loginError}>
                                <div className="content">
                                    <div className="header">Error:</div>
                                    <p>{this.state.loginError}</p>
                                </div>
                            </div>
                            <button className="ui primary button" type={"submit"}>Login</button>
                        </form>
                    </div>
                    <div className="column">
                        <form className="ui error form" onSubmit={this.SignUp}>
                            <div className="field">
                                <label>Name</label>
                                <div className="ui left icon input">
                                    <input required type="text" placeholder="Name" name='first_name'
                                           onChange={this.changeSignUpCred}/>
                                    <i aria-hidden="true" className="user icon"/>
                                </div>
                            </div>
                            <div className="field">
                                <label>Family Name</label>
                                <div className="ui left icon input">
                                    <input required type="text" placeholder="Family Name" name='last_name'
                                           onChange={this.changeSignUpCred}/>
                                    <i aria-hidden="true" className="user icon"/>
                                </div>
                            </div>
                            <div className="field">
                                <label>Username</label>
                                <div className="ui left icon input">
                                    <input required type="text" placeholder="Username" name='username'
                                           onChange={this.changeSignUpCred}/>
                                    <i aria-hidden="true" className="user icon"/>
                                </div>
                            </div>
                            <div className="field">
                                <label>Pass-Word</label>
                                <div className="ui left icon input">
                                    <input required type="password" placeholder="Pass-Word" name='password'
                                           onChange={this.changeSignUpCred}/>
                                    <i aria-hidden="true" className="lock icon"/>
                                </div>
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <div className="ui left icon input">
                                    <input required type="email" placeholder="Email" name='email'
                                           onChange={this.changeSignUpCred}/>
                                    <i aria-hidden="true" className="mail icon"/>
                                </div>
                            </div>
                            <div className="ui error message" hidden={!this.state.signUpError}>
                                <div className="content">
                                    <div className="header">Error:</div>
                                    <p>{this.state.signUpError}</p>
                                </div>
                            </div>
                            <button className="ui positive button" type={"submit"}>Sign-Up</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(null,{loadTokenAndUsernameFromCookies})(withCookies(Login));
