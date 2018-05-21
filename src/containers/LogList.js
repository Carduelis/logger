import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { DEFAULT_LIMIT_LOGS } from '../constants';

import PropTypes from 'prop-types';
import LogEntry from './LogEntry';
import LoadLogsButton from './LoadLogsButton';
import Placeholder from './Placeholder';

import { fetchLogs } from '../store/actions';
import { getStatus, getList } from '../store/reducers/logsReducer';
import getLastTimestamp from '../helpers/getLastTimestamp';

@connect(
    state => ({
        list: getList(state),
        status: getStatus(state)
    }),
    { fetchLogs }
)
export default class LogList extends Component {
    state = {
        lastTimestamp: null,
        limit: DEFAULT_LIMIT_LOGS
    };
    static propTypes = {
        list: PropTypes.array,
        fetchLogs: PropTypes.func,
        status: PropTypes.string
    };
    static getDerivedStateFromProps(nextProps) {
        const { list } = nextProps;
        const lastTimestamp = list.length ? getLastTimestamp(list) : null;
        return {
            lastTimestamp
        };
    }
    handleClick = () => {
        this.props.fetchLogs(this.state.lastTimestamp);
    };
    render() {
        const { limit } = this.state;
        const { list, status } = this.props;
        if (list.length === 0) {
            return (
                <Fragment>
                    <div className="log-list log-list--empty">
                        <Placeholder id="no-log" message="There are no logs" />
                    </div>
                    <LoadLogsButton
                        handleClick={this.handleClick}
                        text={`Load first ${limit} logs`}
                        status={status}
                    />
                </Fragment>
            );
        }
        return (
            <Fragment>
                <div className="log-list">
                    {list.map((item, index) => (
                        <LogEntry key={item.key} {...item} index={index} />
                    ))}
                </div>
                <LoadLogsButton
                    handleClick={this.handleClick}
                    text={`Load ${limit} more.`}
                    status={status}
                />
            </Fragment>
        );
    }
}
