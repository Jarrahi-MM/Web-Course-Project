import React, {Component} from 'react';
import render from 'html-react-parser'

class PostBody extends Component {
    //props:
    //text: the html
    render() {
        let {text='failed to get post body :('} = this.props
        return (
            <div className={'ck-content'}>
                {render(text)}
            </div>
        );
    }
}

export default PostBody;