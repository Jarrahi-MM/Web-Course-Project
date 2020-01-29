import React, {Component} from "react";
import {withCookies} from "react-cookie";

class Login extends Component {
    constructor(probs) {
        super(probs);
        this.state = {
            loginCredentials: {'username': '', 'password': ''},
            signUpCredentials: {'username': '', 'password': '', 'first_name': '', 'last_name': '', 'email': ''}
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

    Login = () => {
        fetch(`http://127.0.0.1:8000/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.loginCredentials)
        }).then(response => response.json())
            .then(response => {
                this.props.cookies.set('myCookie', response.token);
                window.location.href = '/';
            })
            .catch(error => {
            });
    };

    SignUp = () => {
        console.log("GG");
        console.log(this.state.signUpCredentials);
        fetch(`http://127.0.0.1:8000/api1/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.signUpCredentials)
        }).then(response => response.json())
            .then(response => {
                console.log(response);
                // this.props.cookies.set('myCookie', response.token);
                // window.location.href = '/';
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
                            <button className="ui primary button" onClick={this.Login}>Login</button>
                        </form>
                    </div>
                    <div className="column">
                        <form className="ui form">
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
                            <button className="ui positive button" onClick={this.SignUp}>Sign-Up</button>
                        </form>
                    </div>
                </div>
                <div className="ui vertical divider">Or</div>
            </div>
        )
    }

}

export default withCookies(Login);