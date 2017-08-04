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
import { timeEntriesLoaded, timeEntryDelete, selectTimeEntry } from '../actions/timeEntries';
import load from '../services/timeEntries/load';
import { push } from 'react-router-redux';
import destroy from '../services/session/destroy';

@connect(
    ({ timeEntries: { list } }) => ({ list }),
    dispatch => ({
        onLoaded: list => dispatch(timeEntriesLoaded(list)),
        selectTimeEntry: timeEntry => {
            dispatch(selectTimeEntry(timeEntry));
            dispatch(push('/times/edit/'));
        },
        deleteTimeEntry: timeEntry => {
            if (confirm('Are you really want to delete time entry')) { // eslint-disable-line
                destroy(timeEntry).then(() => dispatch(timeEntryDelete(timeEntry)));
            }
        }
    })
)
export default class TimeEntriesList extends Component {
    static propTypes = {
        list: PropTypes.array,
        onLoaded: PropTypes.func,
        selectTimeEntry: PropTypes.func,
        deleteTimeEntry: PropTypes.func
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
                    height={'300px'}
                    fixedHeader
                >
                    <TableHeader displayRowCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn colSpan='6' tooltip='Super Header' style={{ textAlign: 'center' }}>
                                Super Header
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>*</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The Name'>Date</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The Time'>Time</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The Distande'>Distance</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The Speed'>Speed</TableHeaderColumn>
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
                                    <DeleteIcon onClick={() => this.props.deleteTimeEntry(row)} />
                                    <EditIcon onClick={() => this.props.selectTimeEntry(row)} />
                                </TableRowColumn>
                                <TableRowColumn>{row.id}</TableRowColumn>
                                <TableRowColumn>{row.date_pretty}</TableRowColumn>
                                <TableRowColumn>{row.duration}</TableRowColumn>
                                <TableRowColumn>{row.distance}</TableRowColumn>
                                <TableRowColumn>{row.distance / row.duration}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
