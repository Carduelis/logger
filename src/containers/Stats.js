import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Severity from './Severity';

class Stats extends Component {
    // static propTypes = {
    //     data: PropTypes.object
    // };
    render() {
        const { stats } = this.props;

        return (
            <div className="stats">
                <div className="stats-list">
                    {Object.keys(stats).map(severity => (
                        <span key={severity} className="stats-item">
                            <Severity severity={severity} />:{' '}
                            <span className="stats-count">
                                {Object.keys(stats[severity]).length}
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    stats: state.data.stats
});
export default connect(mapStateToProps)(Stats);
