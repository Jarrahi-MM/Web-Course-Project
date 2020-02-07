import _ from 'lodash'
import React, {Component} from 'react'
import {Search} from 'semantic-ui-react'
import {connect} from "react-redux";
import {search} from "../../redux/action_creators/searchActions";
import {withRouter} from 'react-router-dom'

class Searchbox extends Component {
    state = {value: ''};
    handleResultSelect = (e, {result}) => {
        switch (result.group) {
            case "c":
                this.props.history.push('/profile/' + result.id)
                break
            case "p":
                this.props.history.push('/post/' + result.channelid + '/' + result.id)
                break
            case "u":
                this.props.history.push('/profile/' + result.title)
                break
            default:
                return
        }
        this.setState({value: ''})
    };

    handleSearchChange = (e, {value}) => {
        this.setState({value});

        if (value.length < 1) {
            return;
        }

        this.props.search(value)
    };

    render() {
        return (
            <Search
                category
                fluid
                loading={this.props.searchIsLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                })}
                results={this.props.searchResults}
                value={this.state.value}
            />
        )
    }
}

function mapSearchResultsToCategorizedSearchResults(results) {
    let formattedResults = {
        'Channels': {
            'name': 'Channels',
            'results': results.Channels ? results.Channels.map(channel => {
                return {'title': channel.channelName, 'id': channel.channelId, 'group': 'c'}
            }) : []
        },
        'Users': {
            'name': 'Users',
            'results': results.Users ? results.Users.map(user => {
                return {'title': user.username, 'group': 'u'}
            }) : []
        },
        'Posts': {
            'name': 'Posts',
            'results': results.Posts ? results.Posts.map(post => {
                return {'title': post.postTitle, 'id': post.postNumber, 'channelid': post.channel, 'group': 'p'}
            }) : []
        }
    };

    return removeEmptyCategories(formattedResults)
}

function removeEmptyCategories(formattedResults) {
    let tidyObj = {...formattedResults};
    for (let k in formattedResults) {
        if (formattedResults[k].results.length === 0) {
            tidyObj = _.omit(tidyObj, k)
        }
    }
    return tidyObj
}

const mapStateToProps = (state) => ({
    searchResults: mapSearchResultsToCategorizedSearchResults(state.search.searchResults),
    searchIsLoading: state.navbar.searchIsLoading,
});

export default withRouter(connect(mapStateToProps, {search})(Searchbox))