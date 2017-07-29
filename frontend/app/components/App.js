import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import classnames from 'classnames';
import { AppBar, Drawer } from 'material-ui';
import Routes from '../routes';
import '../styles/App.less';
import { connect } from 'react-redux';
import { toggl } from '../actions/laoyut';

@connect(
    ({ layout }) => ({
        open: layout.menuIsOpen
    }),
    dispatch => ({
        onMenuToggl: () => dispatch(toggl())
    })
)
export default class App extends Component {
    static propTypes = {
        open: PropTypes.bool,
        onMenuToggl: PropTypes.func
    };

    render() {
        return <div>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <AppBar
                        className={classnames('app-bar', { 'expanded': this.props.open })}
                        onClick={this.props.onMenuToggl}
                        title='RUNBASE'
                    />
                    <Drawer
                        docked
                        open={this.props.open}
                    >
                        <List>
                            <Subheader>Nested List Items</Subheader>
                            <ListItem primaryText='Sent mail' leftIcon={<ContentSend />} />
                            <ListItem primaryText='Drafts' leftIcon={<ContentDrafts />} />
                        </List>
                    </Drawer>
                    <div className={classnames('app-content', { 'expanded': this.props.open })}>
                        {Routes}
                    </div>
                </div>
            </MuiThemeProvider>
        </div>;
    }
}
