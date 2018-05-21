import { FETCH_LOGS } from '../../constants';

export const getStatus = state => state.data.logs.status;
export const getList = state => state.data.logs.list;

export default function(
    state = {
        list: [],
        status: 'initialized'
    },
    action
) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_LOGS: {
            const { status } = payload;
            if (status === 'done') {
                return {
                    status,
                    list: [...state.list, ...payload.list]
                };
            }
            return { ...state, status };
        }
        default: {
            return state;
        }
    }
}
