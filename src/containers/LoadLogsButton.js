import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoadLogsButton extends Component {
    static propTypes = {
        text: PropTypes.string,
        status: PropTypes.string,
        handleClick: PropTypes.func.isRequired
    };
    render() {
        const { text = 'Load', handleClick, status } = this.props;
        return (
            <div className="load-section">
                <button
                    className={`button button--${status}`}
                    onClick={handleClick}
                >
                    {status === 'pending' ? 'Loading...' : text}
                </button>
            </div>
        );
    }
}

export default LoadLogsButton;
