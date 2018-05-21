import React, { Component } from 'react';
import Message from './Message';
import PropTypes from 'prop-types';

class Severity extends Component {
  static propTypes = {
    severity: PropTypes.string
  };
  render() {
    const { severity } = this.props;
    return (
      <span className={`log-severity log-severity--${severity.toLowerCase()}`}>
        {severity}
      </span>
    );
  }
}

export default Severity;
