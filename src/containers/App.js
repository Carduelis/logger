import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import { SEVERITIES, EVENTS } from '../constants';
import Stats from './Stats';
import LogList from './LogList';
import Loader from './Loader';
import supportPassiveListeners from '../helpers/supportPassiveListeners';

import { addLog, fetchLogs } from '../store/actions';
import { getStatus, getList } from '../store/reducers/logsReducer';
import getLastTimestamp from '../helpers/getLastTimestamp';

@connect(
    state => ({
        list: getList(state),
        status: getStatus(state)
    }),
    { addLog, fetchLogs }
)
class App extends Component {
    state = {
        hasError: false,
        passive: supportPassiveListeners() ? { passive: true } : false
    };
    static propTypes = {
        addLog: PropTypes.func,
        fetchLogs: PropTypes.func,
        list: PropTypes.array,
        status: PropTypes.string
    };
    listener = event => {
        const timestamp = new Date().getTime();
        const severity = SEVERITIES[timestamp % 3];
        const { type } = event;
        this.props.addLog({
            timestamp,
            severity,
            type,
            message: navigator.userAgent
        });
    };
    componentDidMount() {
        const { passive } = this.state;
        EVENTS.forEach(eventName => {
            window.addEventListener(
                eventName,
                debounce(this.listener, 2000),
                passive
            );
        });

        window.addEventListener(
            'scroll',
            debounce(this.lazyload, 200),
            passive
        );
    }
    lazyload = () => {
        if (
            window.scrollY + window.innerHeight >
            document.documentElement.scrollHeight - 10
        ) {
            const { list } = this.props;
            this.props.fetchLogs(getLastTimestamp(list));
        }
    };
    render() {
        const { status } = this.props;
        if (this.state.hasError) {
            return (
                <div className="app">
                    <h3>Sorry, app has been crashed.</h3>
                    <p>See console for more info</p>
                </div>
            );
        }
        return (
            <div className="app">
                {status === 'pending' && (
                    <div className="logs-loader">
                        <Loader />
                    </div>
                )}
                <Stats />
                <LogList />
            </div>
        );
    }
    componentDidCatch(error, info) {
        console.error(error);
        console.error(info);
        this.setState({ hasError: true });
    }
}

export default App;
