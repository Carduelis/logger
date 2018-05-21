import React, { Component } from 'react';
import Message from './Message';
import Severity from './Severity';
import PropTypes from 'prop-types';

class LogEntry extends Component {
    static propTypes = {
        message: PropTypes.string,
        severity: PropTypes.string,
        type: PropTypes.string,
        index: PropTypes.number,
        timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };
    render() {
        const { message, type, severity, timestamp, index } = this.props;
        return (
            <div className="log">
                <div className="log-index">[{index}]</div>
                <div className="log-timestamp">
                    {timestamp}
                    {/* {new Date(timestamp).toLocaleString()} */}
                </div>
                <Severity severity={severity} />
                <Message message={message} type={type} />
            </div>
        );
    }
}

export default LogEntry;
