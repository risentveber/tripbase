import React, { Component } from 'react';
import jsPDF from 'jspdf';
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
import AssignmentIcon from 'material-ui/svg-icons/image/picture-as-pdf';
import { connect } from 'react-redux';
import { tripsLoaded, tripDelete, selectTrip } from '../actions/trips';
import load from '../services/trips/load';
import { push } from 'react-router-redux';
import destroy from '../services/trips/destroy';
import { RaisedButton } from 'material-ui';

const PRINT_STEP = 10;
// const MILLISECONDS_IN_MOUNTH = 30 * 24 * 3600 * 1000;
const nowMoment = moment();
const monthAfterNow = moment().add(1, 'month');
console.log(monthAfterNow);

@connect(
    ({ trips: { list } }) => ({ list: list.filter(item => new Date(item.start_date) >= nowMoment && new Date(item.start_date) <= monthAfterNow) }),
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
export default class TravelPlan extends Component {
    static propTypes = {
        list: PropTypes.array,
        onLoaded: PropTypes.func,
        selectTrip: PropTypes.func,
        deleteTrip: PropTypes.func
    };

    componentDidMount() {
        load().then(data => this.props.onLoaded(data));
    }

    saveAsPDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape'
        });

        this.props.list.forEach((item, index) => {
            doc.text(moment(item.start_date).format('MMM Do YY') + '-' + moment(item.end_date).format('MMM Do YY'), 1, (index * 3 + 1) * PRINT_STEP);
            doc.text(item.destination || '', 4, (index * 3 + 2) * PRINT_STEP);
            doc.text(item.comment || '', 4, (index * 3 + 3) * PRINT_STEP);
        });

        doc.save('trip_plan.pdf');
    };

    render() {
        return (
            <div>
                <h1>Next month travel plan</h1>
                <Table
                    height={'300px'}
                    fixedHeader
                >
                    <TableHeader displayRowCheckbox={false} displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn colSpan='5' tooltip='Trips list' style={{ textAlign: 'center' }}>
                                <RaisedButton
                                    label='Save as'
                                    labelPosition='before'
                                    primary
                                    icon={<AssignmentIcon />}
                                    onClick={this.saveAsPDF}
                                />
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The Start date'>Start date</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The End date'>End date</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The Destination'>Destination</TableHeaderColumn>
                            <TableHeaderColumn tooltip='The comment'>Comment</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover
                        stripedRows
                    >
                        {this.props.list.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>{row.id}</TableRowColumn>
                                <TableRowColumn>{moment(row.start_date).format('MMM Do YY')}</TableRowColumn>
                                <TableRowColumn>{moment(row.end_date).format('MMM Do YY')}</TableRowColumn>
                                <TableRowColumn>{row.destination}</TableRowColumn>
                                <TableRowColumn>{row.comment}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
