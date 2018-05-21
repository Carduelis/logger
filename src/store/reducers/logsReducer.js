import { FETCH_LOGS } from '../../constants';

export default function(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_LOGS: {
            console.log(payload);
            if (payload.status === 'done') {
                return { ...state, ...payload.data };
            }
            return state;
        }
        default: {
            return state;
        }
    }
}
