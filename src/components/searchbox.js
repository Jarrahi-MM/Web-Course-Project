import _ from 'lodash'
import React, {Component} from 'react'
import {Search, Label} from 'semantic-ui-react'

const source = [
    {
        "title": "Bosco, Romaguera and Bins",
        "description": "Front-line client-driven challenge",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/maximseshuk/128.jpg",
        "price": "$99.43"
    },
    {
        "title": "Johnston Group",
        "description": "Focused disintermediate paradigm",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/nicolasfolliot/128.jpg",
        "price": "$60.88"
    },
    {
        "title": "Toy LLC",
        "description": "Networked bandwidth-monitored definition",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/S0ufi4n3/128.jpg",
        "price": "$41.03"
    },
    {
        "title": "Hand LLC",
        "description": "Centralized asynchronous access",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/cemshid/128.jpg",
        "price": "$80.67"
    },
    {
        "title": "Bradtke - Mills",
        "description": "Pre-emptive impactful encryption",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/mutlu82/128.jpg",
        "price": "$8.39"
    }
];

const resultRenderer = ({title}) => {
    return(<Label content={title}/>)
};

const initialState = {isLoading: false, results: [], value: ''}
class SearchBox extends Component {
    state = initialState;

    handleResultSelect = (e, {result}) => {
        this.setState({value: result.title})
    };

    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value})

        setTimeout(() => {
            if (this.state.value.length < 1){
                this.setState(initialState);
                return;
            }

            this.setState({
                isLoading: false,
                results: source
            })
        }, 300)
    };

    handleClick = (e) => {
        e.target.select();
    };

    render() {
        const {isLoading, value, results} = this.state;

        return (
            <Search
                fluid
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                })}
                onClick={this.handleClick}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
            />
        )
    }
}

export default SearchBox