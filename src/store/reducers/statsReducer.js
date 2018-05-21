import { FETCH_LOGS } from '../../constants';

const initialState = {
    WARN: [],
    ERROR: [],
    INFO: []
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_LOGS: {
            // payload is a chunk of messages
            // we need to
            const timeStart = performance.now();
            const newState = Object.keys(payload).reduce(
                (acc, key) => {
                    const { severity } = payload[key];
                    const severities = acc[severity];
                    if (Array.isArray(severities)) {
                        severities.push(key);
                    } else {
                        acc[severity] = [key];
                    }
                    return acc;
                },
                { ...state }
            );
            const timeEnd = performance.now();
            console.log(`Took: ${timeEnd - timeStart} ms`);
            return newState;
            // return Object.assign({}, state, payload);
        }
        default: {
            return state;
        }
    }
}
