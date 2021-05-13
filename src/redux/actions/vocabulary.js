import {
    CHANGE_INPUT_VALUE, GET_WORDS,
    CHANGE_TYPE, CHANGE_WORD
} from './actionTypes'
import axios from "../../axios/axios";

const userId = localStorage.getItem('userId')

const changeInputValue = (value, resultWords) => {
    return {
        type: CHANGE_INPUT_VALUE,
        stringSearch: value,
        resultsSearch: resultWords
    }
}

export const inputChangeHandler = event => {
    return (dispatch, getState) => {
        const state = getState().vocabularyReducer
        const value = event.target.value
        const resultWords =[]
        Object.keys(state.words).forEach(word=>{
            if (state.words[word][state.typeSearch].toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                resultWords.push(state.words[word])
            }
        })
        dispatch(changeInputValue(value, resultWords))
    }
}

const dispatchWords = words => {
    return {
        type: GET_WORDS,
        words
    }

}

export const getWords = () => {
    return async dispatch => {
        const words = {}
        await axios.get('/words.json').then(response => {
            const dataKeys = Object.keys(response.data)
            dataKeys.forEach(data => {
                if (response.data[data].userId === localStorage.getItem('userId')) {
                    words[data] = response.data[data]
                }
            })
        })
        dispatch(dispatchWords(words))
    }
}

const changeType = typeSearch => {
    return {
        type: CHANGE_TYPE,
        typeSearch
    }
}

export const selectChangeHandler = event => {
    return dispatch => {
        const typeSearch = event.target.value
        dispatch(changeType(typeSearch))
    }
}

const changeWords = words => {
    return {
        type: CHANGE_WORD,
        words
    }
}

export const editWord = wordId => {
    return async (dispatch, getState) => {
        const words = {...getState().vocabularyReducer.words}
        const editOriginal = prompt('Слово', words[wordId].original)
        const editTranslate = prompt('Перевод', words[wordId].translate)
        if (editOriginal && editTranslate) {
            const word = {
                userId,
                original: editOriginal[0].toUpperCase() + editOriginal.substring(1),
                translate: editTranslate[0].toUpperCase() + editTranslate.substring(1)
            }
            try {
                await axios.put(`/words/${wordId}.json`, word)
                words[wordId] = word
                dispatch(changeWords(words))
            } catch (e) {
                console.log(e)
            }
        }
    }
}

export const deleteWord = wordId => {
    return async (dispatch, getState) => {
        console.log(wordId)
        // eslint-disable-next-line no-restricted-globals
        const check = confirm('Вы действительно хотите удалить это слово?')
        if (check) {
            const words = {...getState().vocabularyReducer.words}
            try {
                await axios.delete(`/words/${wordId}.json`)
                delete words[wordId]
                dispatch(changeWords(words))
            } catch(e) {
                console.log('Error', e)
            }
        }
    }
}