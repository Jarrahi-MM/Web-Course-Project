import React, {Component} from "react";
import {Link} from "react-router-dom";
import './channel.css'


class EditChannelContributors extends Component {

    state = {
        contributors: [
            {
                username: 'negin',
            },
        ]
    };

    newContributorAdded = event => {

    };

    addClicked = ev => {

    };

    deleteClicked = ev => {

    };

    render() {
        return (
            <React.Fragment>
                <form className="ui form">
                    <div className="field">
                        <div className="three fields">
                            <div className="field">
                                <label>Add New Contributor</label>
                                <input type="text" name="newContributor" placeholder="new Contributor"
                                       onChange={this.newContributorAdded}/>
                            </div>
                            <i className=" icon big plus contain2Style" onClick={this.addClicked}/>
                        </div>
                    </div>
                </form>
                <div>{this.state.contributors.map(contributor => {
                    return (
                        <div key={contributor.id} className="blue">
                            <Link to={`/profile/${contributor.username}`}>
                                <button className=" ui button  big containStyle" >
                                    <span>{contributor.username}</span>
                                </button>
                            </Link>
                            <i className=" icon big trash alternate" onClick={this.deleteClicked}/>
                            <br/>
                        </div>
                    )
                })}
                </div>
            </React.Fragment>
        )
    }

}

export default EditChannelContributors
