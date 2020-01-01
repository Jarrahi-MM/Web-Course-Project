import _ from 'lodash'
import React, {Component} from 'react'
import {Search} from 'semantic-ui-react'
import {connect} from "react-redux";
import {search} from "../redux/action_creators/searchActions";
import {withRouter} from 'react-router-dom'

class SearchBox extends Component {
    state = {value:''}
    handleResultSelect = (e, {result:{title:result}}) => {
        if (result.charAt(result.length - 1) === ' ') {
            if (result.charAt(result.length - 2) === ' ') {
                this.props.history.push('/c/' + result)
            } else {
                this.props.history.push('/u/' + result)
            }
        } else {
            this.props.history.push('/p/' + result)
        }
        this.setState({value:''})
    };

    handleSearchChange = (e, {value}) => {
        this.setState({value})

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
                return {'title': channel.name + '  '}
            }) : []
        },
        'Users': {
            'name': 'Users',
            'results': results.Users ? results.Users.map(user => {
                return {'title': user.name + ' '}
            }) : []
        },
        'Posts': {
            'name': 'Posts',
            'results': results.Posts ? results.Posts.map(post => {
                return {'title': post.name}
            }) : []
        }
    }

    return removeEmptyCategories(formattedResults)
}

function removeEmptyCategories(formattedResults) {
    let tidyObj = {...formattedResults}
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
})

export default withRouter(connect(mapStateToProps, {search})(SearchBox))