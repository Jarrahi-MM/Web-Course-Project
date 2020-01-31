import React, {Component} from "react";
import {withCookies} from "react-cookie";

class FollowList extends Component {

    state = {
        followList: [],
        token: this.props.cookies.get('mr-token')
    };

    componentDidMount() {
        if (this.state.token) {
            fetch("http://127.0.0.1:8000/api/channelInfo/", {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${this.state.token}`
                }
            }).then(response => response.json())
                .then(res => this.setState({followList: res}))
                .catch(error => console.log(error))
        } else {
            window.location.href = '/'
        }
    }

    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }
}

export default withCookies(FollowList)

