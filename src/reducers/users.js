import {  USERLIST } from '../constants/ActionTypes';

const initialState = {
  list: []
};

export default function User (state = initialState, action) {
    switch (action.type) {
        case USERLIST:
            return { list: action.data };
        default:
            return state;
    }
}
