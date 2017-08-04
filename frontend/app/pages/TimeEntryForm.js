import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, RaisedButton, TextField } from 'material-ui';
import PageContent from '../components/PageContent';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { timeEntryCreated } from '../actions/timeEntries';
import createTimeEntry from '../services/timeEntries/create';
import auth from '../decorators/auth';
import { timeEntryAttributeChanged } from '../actions/timeEntries';

const style = {
    marginLeft: 20,
};

const mapDispatchToProps = dispatch => ({
    onChangeAttribute: event => {
        dispatch(timeEntryAttributeChanged(event.target.name, event.target.value));
    },
    onSubmit: ({ date, distance, duration }) => {
        createTimeEntry({ date, distance, duration  })
            .then(timeEntry => dispatch(timeEntryCreated(timeEntry)))
            .then(() => dispatch(push('/times/')))
            .catch(errors => dispatch(timeEntryAttributeChanged('errors', errors)));
    }
});

const mapStateToProps = ({ timeEntries: { selected } }) => selected;

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
        date: PropTypes.string,
        duration: PropTypes.string,
        distance: PropTypes.string,
        errors: PropTypes.object
    };

    static contextTypes = {
        store: PropTypes.object
    };

    render() {
        const {
            onChangeAttribute,
            onSubmit,
            disabled,
            duration,
            date,
            distance,
            errors
        } = this.props;
        console.log(date);

        return <PageContent>
            <h1>Create time entry</h1>
            <DatePicker
                hintText='Date'
                onChange={(_, value) => onChangeAttribute(
                    { target: { name: 'date', value } }
                )}
                errorText={errors.date}
                value={date}
                style={style}
            />
            <TextField
                hintText='Distance'
                onChange={onChangeAttribute}
                name='distance'
                type='number'
                value={distance}
                errorText={errors.distance}
                style={style}
            />
            <br/>
            <TextField
                hintText='Duration'
                onChange={onChangeAttribute}
                name='duration'
                type='number'
                value={duration}
                errorText={errors.duration}
                style={style}
            />
            <br/>
            <RaisedButton
                label='Create'
                primary
                onClick={() => onSubmit(this.props)}
                disabled={disabled}
            />
        </PageContent>;
    }
}
