import {CHANGE_TYPE_TEST, CLEAR_TEST, GET_TESTS, NEXT_QUESTION, START_TEST} from '../actions/actionTypes'

const initialState = {
    statusTest: false,
    typeTest: 'original',
    test: {},
    currentQuestion: 0,
    points: 0
}

export default function testsReducer(state=initialState, action) {
    switch (action.type) {
        case CHANGE_TYPE_TEST:
            return {
                ...state,
                typeTest: action.typeTest
            }
        case GET_TESTS:
            return {
                ...state,
                test: action.test
            }
        case START_TEST:
            return {
                ...state,
                statusTest: true
            }
        case NEXT_QUESTION:
            return {
                ...state,
                inputsTest: action.inputsTest,
                currentQuestion: action.currentQuestion,
                points: action.points,
                startTest: action.startTest
            }
        case CLEAR_TEST:
            return initialState
        default:
            return state
    }
}