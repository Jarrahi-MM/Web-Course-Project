import React, {Component} from "react";


class EditUserProfileForm extends Component {


    state = {
        profileInf: this.props.profileInfo
    };

    inputChanged = event => {
        let profile = this.state.profileInf;
        profile[event.target.name] = event.target.value;
        this.setState({profileInf: profile});
        this.updateClicked()
    };

    userInputChanged = event => {
        let profile = this.state.profileInf;
        profile.user[event.target.name] = event.target.value;
        this.setState({profileInf: profile});
        this.userUpdateClicked()
    };

    updateClicked = () => {
        fetch(`http://127.0.0.1:8000/api1/profiles/${this.props.username}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.profileInf)
        }).then(response => response.json())
            .then(res => this.props.profile(res))
            .catch(error => console.log(error))
    };

    userUpdateClicked = () => {
        fetch(`http://127.0.0.1:8000/api1/users/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.profileInf.user)
        }).then(response => response.json())
            .then(res => this.props.profile(res))
            .catch(error => console.log(error))
    };

    render() {

        return (
            <React.Fragment>
                <form className="ui form">
                    <div className="field">
                        <div className="three fields">
                            <div className="field">
                                <label>first name</label>
                                <input type="text" name="first_name" value={this.state.profileInf.user.first_name}
                                       onChange={this.userInputChanged}/>
                            </div>
                            <div className="field">
                                <label>last name</label>
                                <input type="text" name="last_name" value={this.state.profileInf.user.last_name}
                                       onChange={this.userInputChanged}/>
                            </div>
                            <div className="field">
                                <label>id</label>
                                <input type="text" name="id"
                                       onChange={this.inputChanged}/>
                            </div>
                        </div>
                    </div>
                    <div className="three fields">
                        <div className="field">
                            <label>email</label>
                            <input type="text" name="email" value={this.state.profileInf.user.email}
                                   onChange={this.userInputChanged}/>
                        </div>
                    </div>
                    <div className="ui form">
                        <div className="field">
                            <label>Description</label>
                            <textarea rows="2"
                                      placeholder="Im 20 years old from aliabad ; no follow back ;too shakh;dar hadde ma nisti awrereee"/>
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <div className="ui form">
                                <div className="field">
                                    <label>Country </label>
                                    <input type="text" name="country" value={this.state.profileInf.country}
                                           onChange={this.inputChanged}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <div className="three fields">
                            <div className="field">
                                <label>City </label>
                                <input type="text" name="city" value={this.state.profileInf.city}
                                       onChange={this.inputChanged}/>
                            </div>
                            <div className="field">
                                <label>Phone Number </label>
                                <input type="text" name="phoneNum" value={this.state.profileInf.phoneNum}
                                       onChange={this.inputChanged}/>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }

}

export default EditUserProfileForm
