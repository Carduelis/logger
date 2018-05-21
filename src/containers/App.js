import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'debounce';
import { SEVERITIES, EVENTS } from '../constants';
import Stats from './Stats';
import LogList from './LogList';
import { addLog } from '../store/actions';
import supportPassiveListeners from '../helpers/supportPassiveListeners';
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
        const passive = supportPassiveListeners() ? { passive: true } : false;
        EVENTS.forEach(eventName => {
            window.addEventListener(
                eventName,
                debounce(this.listener, 2000),
                passive
            );
        });
    }
    render() {
        return (
            <div className="app">
                <Stats />
                <LogList />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { addLog })(App);
