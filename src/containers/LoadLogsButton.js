import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoadLogsButton extends Component {
    static propTypes = {
        text: PropTypes.string,
        handleClick: PropTypes.func.isRequired
    };
    render() {
        const { text = 'Load', handleClick } = this.props;
        return (
            <div className="load-section">
                <button className="button" onClick={handleClick}>
                    {text}
                </button>
            </div>
        );
    }
}

export default LoadLogsButton;
