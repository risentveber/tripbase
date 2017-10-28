import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import classnames from 'classnames';
import { AppBar, Drawer } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from '../routes';
import '../styles/App.less';
import { connect } from 'react-redux';
import { toggl } from '../actions/laoyut';
import Menu from './Menu';
import { push } from 'react-router-redux';

@connect(
    ({ layout }) => ({
        open: layout.menuIsOpen
    }),
    dispatch => ({
        onMenuToggl: () => dispatch(toggl()),
        onTitleClick: () => dispatch(push('/'))
    })
)
export default class App extends Component {
    static propTypes = {
        open: PropTypes.bool,
        onMenuToggl: PropTypes.func,
        onTitleClick: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
        injectTapEventPlugin();
    }

    render() {
        return <div>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <AppBar
                        className={classnames('app-bar', { 'expanded': this.props.open })}
                        onLeftIconButtonTouchTap={this.props.onMenuToggl}
                        onTitleTouchTap={this.props.onTitleClick}
                        title='TRIPBASE'
                    />
                    <Drawer
                        docked
                        open={this.props.open}
                    >
                    <Menu/>
                    </Drawer>
                    <div className={classnames('app-content', { 'expanded': this.props.open })}>
                        {Routes}
                    </div>
                </div>
            </MuiThemeProvider>
        </div>;
    }
}
