import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogEntry from './LogEntry';
import Placeholder from './Placeholder';

class LogList extends Component {
    render() {
        const { logs } = this.props;
        console.log(logs);
        const logsArray = Object.keys(logs).map(key => logs[key]);
        if (logsArray.length === 0) {
            return (
                <div className="log-list log-list--empty">
                    <Placeholder id="no-log" message="There are no logs" />
                </div>
            );
        }
        return (
            <div className="log-list">
                {logsArray.map(item => <LogEntry key={item.key} {...item} />)}
            </div>
        ); 
    }
}

const mapStateToProps = state => ({
    logs: state.data.logs
});

export default connect(mapStateToProps)(LogList);
