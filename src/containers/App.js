import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'debounce';
import { SEVERITIES, EVENTS } from '../constants';
import randomInteger from '../helpers/randomInteger';
import Stats from './Stats';
import LogList from './LogList';
import loremIpsum from '../helpers/lorem';
import { addLog, fetchLogs } from '../store/actions';

const statuses = ['WARN', 'ERROR', 'INFO'];
const time = new Date().getTime();
const data = new Array(100).fill(0).map((value, index) => {
    const startSymbol = randomInteger(0, 200);
    const messageLength = Math.round(Math.random())
        ? randomInteger(10, 200)
        : randomInteger(7, 15);
    const message = loremIpsum
        .slice(startSymbol, startSymbol + messageLength)
        .trim();
    return {
        timestamp: time + index * 2835,
        severity: statuses[randomInteger(0, 2)],
        message
    };
});

const stats = data.reduce(
    (acc, item) => {
        acc[item.severity]++;
        return acc;
    },
    {
        WARN: 0,
        INFO: 0,
        ERROR: 0
    }
);

class App extends Component {
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
        EVENTS.forEach(eventName => {
            document.addEventListener(eventName, debounce(this.listener, 2000));
        });
    }
    handleClick = () => {
        this.props.fetchLogs(0, 50);
    };
    render() {
        return (
            <div className="app" onClick={this.handleClick}>
                <Stats data={stats} />
                <LogList />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { addLog, fetchLogs })(App);
