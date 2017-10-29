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
import { tripsLoaded, tripDelete, selectTrip, tripFilterUpdate } from '../actions/trips';
import load from '../services/trips/load';
import { push } from 'react-router-redux';
import destroy from '../services/trips/destroy';
import { TextField } from 'material-ui';

const tripsVisualizer = list => list.map(trip => ({
    ...trip,
    status: moment(trip.start_date).startOf('day').fromNow(),
    start_date: moment(trip.start_date).format('MMM Do YY'),
    end_date: moment(trip.end_date).format('MMM Do YY')
}));
const searchableProperties = ['start_date', 'end_date', 'status', 'id', 'comment', 'destination'];
const containValue = (trip, value) => searchableProperties.some(key => (String(trip[key] || '').toLowerCase()).includes(value));

@connect(
    ({ trips: { list, filter } }) => ({ list: tripsVisualizer(list), filter }),
    dispatch => ({
        onChangeFilterInput: event => dispatch(tripFilterUpdate(event.target.value)),
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
        deleteTrip: PropTypes.func,
        onChangeFilterInput: PropTypes.func,
        filter: PropTypes.string
    };

    componentDidMount() {
        this.props.onChangeFilterInput({ target: { value: '' } });
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
        const { filter } = this.props;
        return (
            <div>
                <Table
                    height={'300px'}
                    fixedHeader
                >
                    <TableHeader displayRowCheckbox={false} displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn colSpan='5' tooltip='Trips list' style={{ textAlign: 'center' }}>
                                Trips list
                            </TableHeaderColumn>
                            <TableHeaderColumn colSpan='2' style={{ textAlign: 'center' }}>
                                <TextField
                                    hintText='Filter'
                                    onChange={this.props.onChangeFilterInput}
                                    name='filter'
                                    value={filter}
                                />
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>*</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The Start date'>Start date</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The End date'>End date</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The Destination'>Destination</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The comment'>Comment</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The status'>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover
                        stripedRows
                    >
                        {this.props.list.filter(trip => !filter || containValue(trip, filter.toLowerCase())).map((row, index) => (
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
                                <TableRowColumn>{row.start_date}</TableRowColumn>
                                <TableRowColumn>{row.end_date}</TableRowColumn>
                                <TableRowColumn>{row.destination}</TableRowColumn>
                                <TableRowColumn>{row.comment}</TableRowColumn>
                                <TableRowColumn>{row.status}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
