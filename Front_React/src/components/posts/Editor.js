import React, {Component} from 'react';
import {connect} from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import render from 'html-react-parser'
import {Button, Placeholder} from "semantic-ui-react";
import {saveData} from "../../redux/action_creators/editorActions";
import {closeModal} from "../../redux/action_creators/modalActions";

class Editor extends Component {
    //pops:
    //action: comment_create, post_create, comment_edit, post_edit
    //address: {supCommentId} , {channelId} , {commentId}, {channelId,postId}
    //initialText: the initial html(when editing)
    state = {
        data: '',
        editorIsLoading: true,
        ...this.props,
        initialText: ''
    };


    handleSave = () => {
        this.props.saveData(this.state)
        this.props.closeModal()
    }

    render() {
        return (
            <div>
                <CKEditor
                    editor={ClassicEditor}
                    data={this.state.initialText}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        this.setState({data})
                    }}
                    onInit={(editor) => {
                        this.setState({editorIsLoading: false, initialText: this.props.initialText})
                    }}
                    config={{
                        cloudServices: {
                            tokenUrl: 'https://59788.cke-cs.com/token/dev/D4EUlj4fwrGlaxEwLwLqfkedrU6RZwlwhF0b1NhgtydQPokOdVxaa2FFAEz0',
                            uploadUrl: 'https://59788.cke-cs.com/easyimage/upload/'
                        },
                        placeholder: 'Type right here...'
                    }}
                />
                {this.state.editorIsLoading ?
                    <Placeholder>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder>
                    :
                    <div className={'text-center mt-3'}>
                        <Button basic color='green' onClick={this.handleSave}>Save</Button>
                        <Button basic color='red' onClick={this.props.closeModal}>Cancel</Button>
                    </div>
                }
            </div>
        );
    }
}

export default connect(null, {saveData, closeModal})(Editor);