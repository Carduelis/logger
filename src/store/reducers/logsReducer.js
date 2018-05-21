import { FETCH_LOGS } from '../../constants';

export default function(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_LOGS: {
            if (payload.status === 'done') {
                const timeStart = performance.now();
                const newState = [...state, ...payload.data];
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
