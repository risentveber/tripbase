import React, { Component } from 'react';
import { Paper } from 'material-ui';
const style = {
    width: '80%',
    margin: '10%',
    padding: '20px',
    textAlign: 'center',
    display: 'block',
};
class PageContent extends Component {
    render() {
        return (<Paper style={style} zDepth={1} rounded={false}>
            {this.props.children}
        </Paper>);
    }
}


export default PageContent;
