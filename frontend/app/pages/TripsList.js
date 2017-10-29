import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
import { tripsLoaded, tripDelete, selectTrip } from '../actions/trips';
import load from '../services/trips/load';
import { push } from 'react-router-redux';
import destroy from '../services/trips/destroy';

@connect(
    ({ trips: { list } }) => ({ list }),
    dispatch => ({
        onLoaded: list => dispatch(tripsLoaded(list)),
        selectTrip: trip => {
            dispatch(selectTrip(trip));
            dispatch(push(`/trips/${trip.id}/edit/`));
        },
        deleteTrip: trip => {
            if (confirm('Are you really want to delete time entry')) { // eslint-disable-line
                destroy(trip.id).then(() => dispatch(tripDelete(trip)));
            }
        }
    })
)
export default class TripsList extends Component {
    static propTypes = {
        list: PropTypes.array,
        match: PropTypes.object,
        onLoaded: PropTypes.func,
        selectTrip: PropTypes.func,
        deleteTrip: PropTypes.func
    };

    componentDidMount() {
        load(this.props.match.params.userId).then(data => this.props.onLoaded(data));
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
                    <TableHeader displayRowCheckbox={false} displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn colSpan='6' tooltip='Trips list' style={{ textAlign: 'center' }}>
                                Trips list
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>*</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The Start date'>Start date</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The End date'>End date</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The Destination'>Destination</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The status'>Status</TableHeaderColumn>
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
                                    <DeleteIcon
                                        hoverColor='#0a0'
                                        onClick={() => this.props.deleteTrip(row)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <EditIcon
                                        hoverColor='#0a0'
                                        onClick={() => this.props.selectTrip(row)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </TableRowColumn>
                                <TableRowColumn>{row.id}</TableRowColumn>
                                <TableRowColumn>{moment(row.start_date).format('MMM Do YY')}</TableRowColumn>
                                <TableRowColumn>{moment(row.end_date).format('MMM Do YY')}</TableRowColumn>
                                <TableRowColumn>{row.destination}</TableRowColumn>
                                <TableRowColumn>{moment(row.start_date).startOf('day').fromNow()}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
