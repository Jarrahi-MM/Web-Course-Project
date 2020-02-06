import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Header, Image, Modal} from "semantic-ui-react";
import Editor from "./Editor";
import {closeModal} from "../../redux/action_creators/modalActions";

class EditorModal extends Component {
    //props:
    //isModalOpen
    //action: comment_create, post_create, comment_edit, post_edit
    //address: {supCommentId} , {channelId} , {commentId}, {channelId,postId}
    //initialText: the initial html(when editing)

    getHeader = () => {
        switch (this.props.action) {
            case 'comment_create':
                return 'Write a comment'
            case 'post_create':
                return 'Create a new post'
            case 'comment_edit':
                return 'Edit your comment'
            case 'post_edit':
                return 'Edit you post'
            default:
                return 'Edit'
        }
    }

    render() {
        let {action, address, initialText} = this.props
        return (
            <div>
                <Modal
                    open={this.props.modalIsOpen}
                >
                    <Modal.Header>{this.getHeader()}</Modal.Header>
                    <Modal.Content>
                        <Editor {...{
                            action,
                            address,
                            initialText,
                        }}/>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        ...state.modal
    };
}

export default connect(mapStateToProps,{closeModal})(EditorModal);