import { combineReducers } from 'redux';
import logsReducer from './logsReducer';
import sentLogsReducer from './sentLogsReducer';
import statsReducer from './statsReducer';

export default combineReducers({
    logs: logsReducer,
    sentLogs: sentLogsReducer,
    stats: statsReducer
});
