import React, {Component} from 'react';
import svgEmpty from '../static/empty.svg'
import {withStyles} from "@material-ui/core";

const style = {
    empimg: {
        maxHeight: '40vh',
    }
}

class NoContent extends Component {
    render() {
        return (
            <div className={'d-flex flex-column h-100 justify-content-center'}>
                <img src={svgEmpty} alt={'No content'} className={this.props.classes.empimg}/>
                <span className={'display-4 align-self-center mt-3 text-secondary'}>No content here</span>
            </div>
        );
    }
}

export default withStyles(style)(NoContent);