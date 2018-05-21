import React, { Component } from 'react';
import Message from './Message';
import Severity from './Severity';
import PropTypes from 'prop-types';

class LogEntry extends Component {
  static propTypes = {
    message: PropTypes.string,
    severity: PropTypes.string,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
  render() {
    const { message, severity, timestamp } = this.props;
    return (
      <div className="log">
        <div className="log-timestamp">
          {new Date(timestamp).toLocaleString()}
        </div>
        <Severity severity={severity} />
        <Message message={message} />
      </div>
    );
  }
}

export default LogEntry;
