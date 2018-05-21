import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LogEntry from './LogEntry';
import LoadLogsButton from './LoadLogsButton';
import { DEFAULT_LIMIT_LOGS } from '../constants';
import Placeholder from './Placeholder';

import { fetchLogs } from '../store/actions';
class LogList extends Component {
    state = {
        lastTimestamp: null,
        limit: DEFAULT_LIMIT_LOGS,
        logsArray: []
    };
    static getDerivedStateFromProps(nextProps, prevState) {
        const { logs } = nextProps;
        const logsArray = Object.keys(logs)
            .map(key => logs[key])
            .sort(item => -item.timestamp);
        const lastTimestamp = logsArray.length
            ? logsArray[logsArray.length - 1].timestamp
            : null;
        console.log(logsArray.map(i => i.timestamp));
        console.log('lastTimestamp:', lastTimestamp);
        return {
            lastTimestamp,
            logsArray
        };
    }
    handleClick = () => {
        this.props.fetchLogs(this.state.lastTimestamp);
    };
    render() {
        const { limit, logsArray } = this.state;
        if (logsArray.length === 0) {
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
                    {logsArray.map((item, index) => (
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
