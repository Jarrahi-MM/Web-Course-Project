import React, {Component} from 'react';
import {Feed, Loader} from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import AlertItem from "./AlertItem";
import {connect} from "react-redux";
import nextId from "react-id-generator";
import {loadMoreAlerts} from "../../redux/action_creators/alertActions";

class AlertsPage extends Component {
    render() {
        return (
            <div className={'container mt-3 shadow pb-3'}>
                <InfiniteScroll
                    loadMore={() => this.loadMore()}
                    hasMore={this.props.hasMoreItems}
                    loader={this.getLoaderComponent()}>

                    <Feed size={'large'}>
                        {this.props.alerts.map(alert => {
                            return (
                                <AlertItem alert={alert} key={nextId()}/>
                            )
                        })}
                    </Feed>

                </InfiniteScroll>
            </div>
        );
    }

    loadMore() {
        this.props.loadMoreAlerts()
    }

    getLoaderComponent() {
        return (
            <Loader key={-1} active inline={"centered"}/>
        )
    }
}

const mapStateToProps = (state) => ({
    hasMoreItems: state.alerts.hasMoreItems,
    alerts: state.alerts.alerts
})

export default connect(mapStateToProps, {loadMoreAlerts})(AlertsPage);