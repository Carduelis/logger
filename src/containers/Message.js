import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
    state = {
        hidden: true
    };
    static propTypes = {
        message: PropTypes.string,
        type: PropTypes.string
    };
    toggleState = () => {
        this.setState({
            hidden: !this.state.hidden
        });
    };
    render() {
        const { message, type } = this.props;
        const BUTTON_TEXT = this.state.hidden ? '[...]' : '>...<';
        const HAS_CUT = message.length > 30;
        const renderedMessage = this.state.hidden
            ? message.slice(0, 30)
            : message;
        return (
            <div className="log-message">
                <div className="log-message-text">
                    [{type}] {renderedMessage}
                </div>
                {HAS_CUT && (
                    <span
                        className="log-message-button"
                        onClick={this.toggleState}
                    >
                        {BUTTON_TEXT}
                    </span>
                )}
            </div>
        );
    }
}

export default Message;
