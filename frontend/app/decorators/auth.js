import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import mixins from 'smart-mixin';

const mixComponentWillMount = mixins({
    componentWillMount: mixins.MANY
});

export default Component => {
    Component.contextTypes = Component.contextTypes || {};
    Component.contextTypes.store = PropTypes.object;
    mixComponentWillMount(
        Component.prototype,
        {
            componentWillMount() {
                if (this.context.store.getState().currentUser.role === 'anonymous') {
                    this.context.store.dispatch(push('/login/'));
                }
            }
        }
    );
};
