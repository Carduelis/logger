import firebase from 'firebase';
import {
    FETCH_LOGS,
    LOG_ADDED,
    LOG_ADD_ERROR,
    FIREBASE_CONFIG
} from '../../constants';

import sortedKeysBy from '../../helpers/sortedKeysBy';

firebase.initializeApp(FIREBASE_CONFIG);

export function fetchLogs(lastTimestamp, limit) {
    console.log(lastTimestamp, limit);
    return dispatch => {
        dispatch({
            type: FETCH_LOGS,
            payload: {
                status: 'pending'
            }
        });
        const ref = firebase
            .database()
            .ref('/logs/')
            .orderByChild('timestamp')
            .startAt(1526842999075)
            .limitToFirst(30)
            // .endAt(offset + limit)
            .once('value')
            .then(snapshot => {
                const values = snapshot.val();
                const data = Object.keys(values).reduce((acc, key) => {
                    acc[key] = { key, ...values[key] };
                    return acc;
                }, {});
                console.log(data);
                dispatch({
                    type: FETCH_LOGS,
                    payload: {
                        status: 'done',
                        data
                    }
                });
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

        // ref.on('value', snapshot => {
        //     const payload = snapshot.val();
        //     console.log(snapshot);
        //     dispatch({
        //         type: FETCH_LOGS,
        //         payload
        //     });
        // });
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
                    type: LOG_ADDED,
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
