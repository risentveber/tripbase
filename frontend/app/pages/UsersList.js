import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { connect } from 'react-redux';
import { usersLoaded, userDelete, selectUser } from '../actions/users';
import load from '../services/users/list';
import { push } from 'react-router-redux';
import destroy from '../services/users/destroy';

@connect(
    ({ users: { list } }) => ({ list }),
    dispatch => ({
        onLoaded: list => dispatch(usersLoaded(list)),
        selectUser: user => {
            dispatch(selectUser(user));
            dispatch(push(`/users/${user.id}/edit/`));
        },
        deleteUser: user => {
            if (confirm('Are you really want to delete this user?')) { // eslint-disable-line
                destroy(user.id).then(() => dispatch(userDelete(user)));
            }
        }
    })
)
export default class UsersList extends Component {
    static propTypes = {
        list: PropTypes.array,
        onLoaded: PropTypes.func,
        selectUser: PropTypes.func,
        deleteUser: PropTypes.func
    };

    componentDidMount() {
        load().then(data => this.props.onLoaded(data));
    }

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({ height: event.target.value });
    };

    render() {
        return (
            <div>
                <Table
                    fixedHeader
                >
                    <TableHeader displayRowCheckbox={false} displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn colSpan='5' tooltip='Users list' style={{ textAlign: 'center' }}>
                                Users list
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>*</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The name'>Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The email'>Email</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The role'>Role</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover
                        stripedRows
                    >
                        {this.props.list.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>
                                    <DeleteIcon onClick={() => this.props.deleteUser(row)} />
                                    <EditIcon onClick={() => this.props.selectUser(row)} />
                                </TableRowColumn>
                                <TableRowColumn>{row.id}</TableRowColumn>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.email}</TableRowColumn>
                                <TableRowColumn>{row.role}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
