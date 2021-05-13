import {TOGGLE_FORM} from "../actions/actionTypes";

const initialState = {
    showForm: false
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FORM:
            return {
                ...state,
                showForm: action.visible
            }
        default:
            return state
    }
}