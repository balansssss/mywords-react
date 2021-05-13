import {combineReducers} from 'redux'
import mainReducer from './mainReducer'
import vocabularyReducer from './vocabularyReducer'
import testsReducer from './testsReducer'
import authReducer from './authReducer'

export default combineReducers({
    mainReducer,
    vocabularyReducer,
    testsReducer,
    authReducer
})