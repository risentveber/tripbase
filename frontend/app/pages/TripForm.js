import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, RaisedButton, TextField } from 'material-ui';
import PageContent from '../components/PageContent';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { tripCreated } from '../actions/trips';
import createTrip from '../services/trips/create';
import updatedTrip from '../services/trips/update';
import auth from '../decorators/auth';
import { tripAttributeChanged } from '../actions/trips';

const style = {
    marginLeft: 20,
};

const mapDispatchToProps = dispatch => ({
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
export default class Login extends Component {
    static propTypes = {
        onChangeAttribute: PropTypes.func,
        onSingUpClick: PropTypes.func,
        onSubmit: PropTypes.func,
        disabled: PropTypes.bool,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        comment: PropTypes.string,
        destination: PropTypes.string,
        errors: PropTypes.object
    };

    static contextTypes = {
        store: PropTypes.object
    };

    render() {
        // console.log(this.props.start_date);
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
