import { LOG_SENT } from '../../constants';

export default function(state = {}, action) {
    const { type, payload } = action;

    switch (type) {
        case LOG_SENT: {
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
