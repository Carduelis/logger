import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Severity from './Severity';

class Stats extends Component {
    static propTypes = {
        data: PropTypes.object
    };
    render() {
        const { data } = this.props;

        return (
            <div className="stats">
                <div className="stats-list">
                    {Object.keys(data).map(severity => (
                        <span key={severity} className="stats-item">
                            <Severity severity={severity} />:{' '}
                            <span className="stats-count">
                                {data[severity]}
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        );
    }
}

export default Stats;
