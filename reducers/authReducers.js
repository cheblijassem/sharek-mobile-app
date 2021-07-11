import {
    SET_CURRENT_USER,
    USER_LOADING,
    USER_REGISTRED
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    isRegistred: false,
    user: {},
    loading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case USER_REGISTRED:
            return {
                ...state,
                isRegistred: !isEmpty(action.payload),
            };
        default:
            return state;
    }
}