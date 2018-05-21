import { LOG_ADDED } from '../../constants';

export default function(state = {}, action) {
    const { type, payload } = action;

    switch (type) {
        case LOG_ADDED: {
            const logEntry = {
                [payload.id]: payload
            };
            return { ...state, ...logEntry };
        }
        default: {
            return state;
        }
    }
}
