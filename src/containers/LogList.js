import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { DEFAULT_LIMIT_LOGS } from '../constants';

import LogEntry from './LogEntry';
import LoadLogsButton from './LoadLogsButton';
import Placeholder from './Placeholder';

import { fetchLogs } from '../store/actions';
class LogList extends Component {
    state = {
        lastTimestamp: null,
        limit: DEFAULT_LIMIT_LOGS
    };
    static getDerivedStateFromProps(nextProps) {
        const { logs } = nextProps;
        const lastTimestamp = logs.length
            ? logs[logs.length - 1].timestamp
            : null;
        return {
            lastTimestamp
        };
    }
    handleClick = () => {
        this.props.fetchLogs(this.state.lastTimestamp);
    };
    render() {
        const { limit } = this.state;
        const { logs } = this.props;
        if (logs.length === 0) {
            return (
                <Fragment>
                    <div className="log-list log-list--empty">
                        <Placeholder id="no-log" message="There are no logs" />
                    </div>
                    <LoadLogsButton
                        handleClick={this.handleClick}
                        text={`Load first ${limit} logs`}
                    />
                </Fragment>
            );
        }
        return (
            <Fragment>
                <div className="log-list">
                    {logs.map((item, index) => (
                        <LogEntry key={item.key} {...item} index={index} />
                    ))}
                </div>
                <LoadLogsButton
                    handleClick={this.handleClick}
                    text={`Load ${limit} more`}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    logs: state.data.logs
});

export default connect(mapStateToProps, { fetchLogs })(LogList);
