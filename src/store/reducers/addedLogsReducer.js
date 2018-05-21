import { LOG_ADDED } from '../../constants';

export default function(state = 0, action) {
    const { type, payload } = action;

    switch (type) {
        case LOG_ADDED: {
            console.log(state);
            return state + 1;
        }
        default: {
            return state;
        }
    }
}
