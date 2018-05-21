import { FETCH_LOGS } from '../../constants';

export default function(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_LOGS: {
            // payload is a chunk of messages
            // we need to
            if (payload.status === 'done') {
                const { data } = payload;
                const timeStart = performance.now();
                const newState = data.reduce(
                    (acc, log) => {
                        const { severity } = log;
                        const severities = acc[severity];
                        if (typeof severities === 'object') {
                            severities[log.key] = true;
                        } else {
                            console.warn(
                                `[Ok] Unexpected severity status: ${key}`
                            );
                            acc[severity] = { [log.key]: true };
                        }
                        return acc;
                    },
                    { ...state }
                );
                const timeEnd = performance.now();
                console.log(`Took: ${timeEnd - timeStart} ms`);
                return newState;
            }
            return state;
        }
        default: {
            return state;
        }
    }
}
