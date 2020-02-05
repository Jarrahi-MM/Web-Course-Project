import React, {Component} from "react";
import {withCookies} from "react-cookie";

class FollowList extends Component {

    state = {
        followList: [],
        token: this.props.cookies.get('myToken')
    };

    componentDidMount() {
        console.log("fuck u ")
        console.log(this.state.token)
        if (this.state.token) {
            console.log("fuck u ")
            fetch(`http://127.0.0.1:8000/api1/channels/${this.props.username}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${this.state.token}`
                }
            }).then(response => response.json())
                .then(res => {
                    console.log(res)
                    console.log(res.followers)
                    this.setState({followList: res.followers})
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="containStyle">
                    <div className="ui piled raised very padded container segment">
                        <h3>wtf</h3>
                        <div>{this.state.followList.map(followering => {
                            return (
                                <div key={followering.id}>
                                    <h3>
                                        {followering}
                                    </h3>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withCookies(FollowList)

