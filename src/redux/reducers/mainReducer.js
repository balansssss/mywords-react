import {WHEEL} from '../actions/actionTypes'

const initialState = {
    onWheel: false
}

export default function mainReducer(state=initialState, action) {
    switch (action.type) {
        case WHEEL:
            return {
                ...state,
                onWheel: action.wheel
            }
        default:
            return state;
    }
}