import {CHANGE_INPUT_VALUE, GET_WORDS, CHANGE_TYPE, CHANGE_WORD} from '../actions/actionTypes'

const initialState = {
    loading: true,
    words: {},
    stringSearch: '',
    typeSearch: 'original',
    resultsSearch: []
}

export default function vocabularyReducer(state=initialState, action) {
    switch (action.type) {
        case CHANGE_INPUT_VALUE:
            return {
                ...state,
                stringSearch: action.stringSearch,
                resultsSearch: action.resultsSearch
            }
        case GET_WORDS:
            return {
                ...state,
                loading: false,
                words: action.words
            }
        case CHANGE_TYPE:
            return {
                ...state,
                typeSearch: action.typeSearch
            }
        case CHANGE_WORD:
            return {
                ...state,
                words: action.words
        }
        default:
            return state
    }
}