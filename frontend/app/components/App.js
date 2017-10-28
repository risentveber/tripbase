import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import classnames from 'classnames';
import { AppBar, Drawer, Snackbar } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from '../routes';
import '../styles/App.less';
import { connect } from 'react-redux';
import { toggl, setBottomMessage } from '../actions/laoyut';
import Menu from './Menu';
import { push } from 'react-router-redux';

@connect(
    ({ layout }) => ({
        open: layout.menuIsOpen,
        bottomMessageText: layout.bottomMessageText
    }),
    dispatch => ({
        onMenuToggl: () => dispatch(toggl()),
        onTitleClick: () => dispatch(push('/')),
        onClearMessage: () => dispatch(setBottomMessage(''))
    })
)
export default class App extends Component {
    static propTypes = {
        open: PropTypes.bool,
        bottomMessageText: PropTypes.string,
        onMenuToggl: PropTypes.func,
        onClearMessage: PropTypes.func,
        onTitleClick: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
        injectTapEventPlugin();
    }

    render() {
        const { open, bottomMessageText } = this.props;

        return <div>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <AppBar
                        className={classnames('app-bar', { expanded: open })}
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
                    <Snackbar
                        open={!!bottomMessageText}
                        message={bottomMessageText}
                        autoHideDuration={5000}
                        onRequestClose={this.props.onClearMessage}
                    />
                    <div className={classnames('app-content', { expanded: open })}>
                        {Routes}
                    </div>
                </div>
            </MuiThemeProvider>
        </div>;
    }
}
