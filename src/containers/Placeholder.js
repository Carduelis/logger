import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Placeholder extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        children: PropTypes.element
    };
    render() {
        const { id, message, children } = this.props;
        return (
            <div className={`placeholder placeholder--${id}`}>
                <span className="placeholder-icon" />
                <span className="placeholder-message">{message}</span>
                {children && (
                    <span className="placeholder-message">{children}</span>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    logs: state.data.logs
});

export default Placeholder;
