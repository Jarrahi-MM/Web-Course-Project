import React, {Component} from 'react';
import {Feed} from "semantic-ui-react";
import TimeAgo from "react-timeago/lib";
import {Link} from "react-router-dom";
import _ from 'lodash'

class AlertItem extends Component {
    render() {
        let {alert} = this.props;

        switch (alert.type) {
            case 'follow':
                return this.generateFollowAlert(alert);
            case 'comment':
                return this.generateCommentAlert(alert);
            default:
                return null
        }
    }

    bsClasses = 'p-3 border-bottom';
    titleMaxLength = 30;
    commentPreviewMaxLength = 100;


    generateCommentAlert(alert) {
        return (
            <Feed.Event className={this.bsClasses}>
                <Feed.Label image={alert.imageURL}/>
                <Feed.Content>
                    <Feed.Summary>
                        <Link to={'/profile/' + alert.byUsername}>{alert.byUsername}</Link>
                        &nbsp;commented on you post:&nbsp;
                        <Link
                            to={'/post/' + alert.postId}>
                            {_.truncate(alert.postTitle, {length: this.titleMaxLength})}
                        </Link>
                        <Feed.Date><TimeAgo date={alert.date}/></Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {_.truncate(alert.comment, {length: this.commentPreviewMaxLength})}
                    </Feed.Extra>
                </Feed.Content>
            </Feed.Event>
        )
    }

    generateFollowAlert(alert) {
        return (
            <Feed.Event className={this.bsClasses}>
                <Feed.Label image={alert.imageURL}/>
                <Feed.Content>
                    <Feed.Summary>
                        <Link to={'/profile/' + alert.byUsername}>{alert.byUsername}</Link>
                        &nbsp;started following you!
                        <Feed.Date><TimeAgo date={alert.date}/></Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        )
    }
}

export default AlertItem;