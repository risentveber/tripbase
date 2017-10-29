import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, RaisedButton, TextField } from 'material-ui';
import PageContent from '../components/PageContent';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { tripCreated } from '../actions/trips';
import createTrip from '../services/trips/create';
import updatedTrip from '../services/trips/update';
import getTrip from '../services/trips/show';
import auth from '../decorators/auth';
import { tripAttributeChanged, selectTrip } from '../actions/trips';
import { setBottomMessage } from '../actions/laoyut';

const style = {
    marginLeft: 20,
};

const mapDispatchToProps = dispatch => ({
    onTripLoad: trip => {
        dispatch(selectTrip(trip));
    },
    onTripLoadFail: () => {
        console.log('afsdfasfasdfasd');
        dispatch(setBottomMessage('Not found'));
        dispatch(push('/trips/'));
    },
    onChangeAttribute: event => {
        dispatch(tripAttributeChanged(event.target.name, event.target.value));
    },
    onSubmit: ({ id, start_date, end_date, comment, destination }) => {
        let promise;
        if (!id) {
            promise = createTrip({ start_date, end_date, comment, destination })
                .then(trip => dispatch(tripCreated(trip)));
        } else {
            promise = updatedTrip({ id, start_date, end_date, comment, destination });
        }

        promise.then(() => dispatch(push('/trips/')))
            .catch(errors => console.log(errors) || dispatch(tripAttributeChanged('errors', errors)));
    }
});

const mapStateToProps = ({ trips: { selected } }) => selected;

@auth
@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class TripForm extends Component {
    static propTypes = {
        onChangeAttribute: PropTypes.func,
        onSingUpClick: PropTypes.func,
        onTripLoadFail: PropTypes.func,
        onSubmit: PropTypes.func,
        disabled: PropTypes.bool,
        start_date: PropTypes.object,
        end_date: PropTypes.object,
        comment: PropTypes.string,
        destination: PropTypes.string,
        errors: PropTypes.object,
        match: PropTypes.object,
        onTripLoad: PropTypes.func
    };

    static contextTypes = {
        store: PropTypes.object
    };

    componentDidMount() {
        const { tripId }  = this.props.match.params;

        if (tripId) {
            getTrip(tripId).then(this.props.onTripLoad, this.props.onTripLoadFail);
        }
    }

    render() {
        const {
            onChangeAttribute,
            onSubmit,
            disabled,
            end_date,
            start_date,
            destination,
            comment,
            errors
        } = this.props;

        return <PageContent>
            <h1>Create trip</h1>
            <DatePicker
                hintText='Start date'
                onChange={(_, value) => onChangeAttribute(
                    { target: { name: 'start_date', value } }
                )}
                errorText={errors.start_date}
                value={start_date}
                style={style}
            />
            <DatePicker
                hintText='End date'
                onChange={(_, value) => onChangeAttribute(
                    { target: { name: 'end_date', value } }
                )}
                errorText={errors.end_date}
                value={end_date}
                style={style}
            />
            <TextField
                hintText='Destination'
                onChange={onChangeAttribute}
                name='destination'
                value={destination}
                errorText={errors.destination}
                style={style}
            />
            <br/>
            <TextField
                hintText='Comment'
                onChange={onChangeAttribute}
                name='comment'
                type='text'
                value={comment}
                errorText={errors.comment}
                style={style}
            />
            <br/>
            <RaisedButton
                label='Save'
                primary
                onClick={() => onSubmit(this.props)}
                disabled={disabled}
            />
        </PageContent>;
    }
}
