import React, {Component} from "react";


class EditChannelContributors extends Component {

    newContributorAdded = event => {

    };

    addClicked = ev => {

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
                            <button className="ui button mini blue" onClick={this.addClicked}>
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }

}

export default EditChannelContributors
