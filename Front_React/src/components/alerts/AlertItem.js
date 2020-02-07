import React, {Component} from 'react';
import {Feed} from "semantic-ui-react";
import TimeAgo from "react-timeago/lib";
import {Link} from "react-router-dom";
import _ from 'lodash'

class AlertItem extends Component {
    render() {
        let {alert} = this.props;

        if (alert.isComment){
            return this.generateFollowAlert(alert);
        }else {
            return this.generateCommentAlert(alert);
        }
    }

    bsClasses = 'p-3 border-bottom';
    titleMaxLength = 30;
    commentPreviewMaxLength = 100;


    generateCommentAlert(alert) {
        return (
            <Feed.Event className={this.bsClasses}>
                <Feed.Label icon={'comment alternate outline'}/>
                <Feed.Content>
                    <Feed.Summary>
                        <Link to={'/profiles/' + alert.by_user.username}>{alert.by_user.username}</Link>
                        &nbsp;commented on you post:&nbsp;
                        <Link
                            to={'/post/' + alert.post.channel + '/' + alert.post.postNumber}>
                            {_.truncate(alert.post.postTitle, {length: this.titleMaxLength})}
                        </Link>
                        <Feed.Date><TimeAgo date={alert.creation_date}/></Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {_.truncate(alert.comment.text, {length: this.commentPreviewMaxLength})}
                    </Feed.Extra>
                </Feed.Content>
            </Feed.Event>
        )
    }

    generateFollowAlert(alert) {
        return (
            <Feed.Event className={this.bsClasses}>
                <Feed.Label icon={'handshake outline'}/>
                <Feed.Content>
                    <Feed.Summary>
                        <Link to={'/profile/' + alert.by_user.username}>{alert.by_user.username}</Link>
                        &nbsp;started following you!
                        <Feed.Date><TimeAgo date={alert.creation_date}/></Feed.Date>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        )
    }
}

export default AlertItem;