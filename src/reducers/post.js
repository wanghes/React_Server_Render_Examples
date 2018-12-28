import { POSTLIST } from '../constants/ActionTypes';

const initialState = {
    list: []
};

export default function Post(state = initialState, action) {
    switch (action.type) {
        case POSTLIST:
            return { list: action.data };
        default:
            return state;
    }
}
