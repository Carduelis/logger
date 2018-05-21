import firebase from 'firebase/app';
import 'firebase/database';
import {
    FETCH_LOGS,
    LOG_SENT,
    LOG_ADD_ERROR,
    FIREBASE_CONFIG,
    LOG_ADDED,
    DEFAULT_LIMIT_LOGS
} from '../../constants';

import timestampComparator from '../../helpers/timestampComparator';

firebase.initializeApp(FIREBASE_CONFIG);

export function fetchLogs(lastTimestamp = null, limit = DEFAULT_LIMIT_LOGS) {
    return dispatch => {
        dispatch({
            type: FETCH_LOGS,
            payload: {
                status: 'pending'
            }
        });
        const limitToFirst = lastTimestamp ? limit + 1 : limit;
        const ref = firebase
            .database()
            .ref('/logs/')
            .orderByChild('timestamp')
            .limitToFirst(limitToFirst)
            .startAt(lastTimestamp)
            .once('value')
            .then(snapshot => {
                const values = snapshot.val();
                const data = Object.keys(values)
                    .map(key => ({
                        key,
                        ...values[key]
                    }))
                    .sort(timestampComparator);
                console.log(
                    data.map(item =>
                        new Date(item.timestamp).toLocaleTimeString()
                    )
                );
                if (lastTimestamp) {
                    // remove the lastTimestamp's item
                    data.shift();
                }
                if (data.length === 0) {
                    alert('There are no mors logs. Generate more logs');
                } else {
                    dispatch({
                        type: FETCH_LOGS,
                        payload: {
                            status: 'done',
                            data
                        }
                    });
                }
            })
            .catch(snapshot => {
                console.error(snapshot);
                dispatch({
                    type: FETCH_LOGS,
                    payload: {
                        status: 'error'
                    }
                });
            });
    };
}

export function addLog(logEntry) {
    return dispatch => {
        const rootRef = firebase.database().ref();
        const logsRef = rootRef.child('logs');
        const newPost = logsRef.push();
        newPost
            .set({ ...logEntry })
            .then(() => {
                dispatch({
                    type: LOG_SENT,
                    payload: {
                        id: newPost.key,
                        ...logEntry
                    }
                });
            })
            .catch(error => {
                console.error(error);
                dispatch({
                    type: LOG_ADD_ERROR,
                    error
                });
            });
    };
}

export function listenForANew() {
    console.warn(
        'Do not use, it fetches all of the data. Need to switch into Cloud Database'
    );
    // return dispatch => {
    //     const ref = firebase.database().ref('/logs/');
    //     ref.on('child_added', data => {
    //         console.log(data);
    //         dispatch({
    //             type: LOG_ADDED,
    //             payload: data
    //         });
    //     });
    // };
}
