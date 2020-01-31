import React, {Component} from "react";
import profile from "./profile";


class EditUserProfileForm extends Component {


    state = {
        profileInf: this.props.profileInfo
    };

    inputChanged = event => {
        console.log("shut up")
        console.log(this.state.profileInf);
        let profile = this.state.profileInf;
        profile[event.target.name] = event.target.value;
        this.setState({profileInf: profile})
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

    render() {

        return (
            <React.Fragment>
                <form className="ui form">
                    <div className="field">
                        <label>Name</label>
                        <div className="three fields">
                            <div className="field">
                                <input type="text" name="first-name" placeholder="First Name"/>
                            </div>
                            <div className="field">
                                <input type="text" name="last-name" placeholder="Last Name"/>
                            </div>
                            <div className="field">
                                <input type="text" name="id" placeholder="ID"/>
                            </div>
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
                                    <label>Country : {this.props.profileInfo.country}</label>
                                    <input type="text" name="country" value={this.state.profileInf.country}
                                           onChange={this.inputChanged}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <div className="three fields">
                            <div className="field">
                                <label>City :{this.props.profileInfo.city}</label>
                                <input type="text" name="city" value={this.state.profileInf.city}
                                       onChange={this.inputChanged}/>
                            </div>
                            <div className="field">
                                <label>Phone Number : {this.props.profileInfo.phoneNum}</label>
                                <input type="text" name="phoneNum" value={this.state.profileInf.phoneNum}
                                       onChange={this.inputChanged}/>
                            </div>
                        </div>
                    </div>
                    <div className="ui button" tabIndex="0" onClick={this.updateClicked}>Submit Order</div>
                </form>
            </React.Fragment>
        )
    }

}

export default EditUserProfileForm
