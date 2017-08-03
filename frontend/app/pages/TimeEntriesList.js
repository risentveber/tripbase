import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const tableData = [
    {
        id: 23,
        date: '6 of march',
        distance: 100,
        time: 10
    },
    {
        id: 44,
        date: '30 of april',
        distance: 50,
        time: 10
    },
    {
        id: 7,
        date: '2 of june',
        distance: 100,
        time: 20
    },
    {
        id: 26,
        date: '6 of march',
        distance: 20,
        time: 4
    }
];

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class TimeEntriesList extends Component {
    state = {
        fixedHeader: true,
        stripedRows: true,
        height: '300px',
    };

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
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
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
                        {tableData.map( (row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>{row.id}</TableRowColumn>
                                <TableRowColumn>{row.date}</TableRowColumn>
                                <TableRowColumn>{row.time}</TableRowColumn>
                                <TableRowColumn>{row.distance}</TableRowColumn>
                                <TableRowColumn>{row.distance / row.time}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
