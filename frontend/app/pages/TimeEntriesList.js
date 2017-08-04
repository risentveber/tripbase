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
import { connect } from 'react-redux';
import { timeEntriesLoaded } from '../actions/timeEntries';
import load from '../services/timeEntries/load';

@connect(
    ({ timeEntries: { list } }) => ({ list }),
    dispatch => ({ onLoaded: list => dispatch(timeEntriesLoaded(list)) })
)
export default class TimeEntriesList extends Component {
    static propTypes = {
        list: PropTypes.array,
        onLoaded: PropTypes.array
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
                            <TableHeaderColumn colSpan='5' tooltip='Super Header' style={{ textAlign: 'center' }}>
                                Super Header
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
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
                        {this.props.list.map( (row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>{row.id}</TableRowColumn>
                                <TableRowColumn>{row.date}</TableRowColumn>
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
