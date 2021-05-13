import {WHEEL} from './actionTypes'
import axios from '../../axios/axios'

export const wheel = value => {
    return {
        type: WHEEL,
        wheel: value
    }
}

export const wheelHandler = event => {
    return (dispatch, getState) => {
        const onWheel = getState().mainReducer.onWheel
        const pos = event.deltaY
        if (pos>0 && !onWheel) {
           dispatch(wheel(true))
        } else if (pos<0 && onWheel) {
            dispatch(wheel(false))
        }
    }
}

export const showForm = () => {
    return wheel(true)
}

export const onSubmitHandler = state => {
    return async dispatch => {
        let original = ''
        let translate = ''
        const inputs = [...state.inputs]
        inputs.forEach(input => {
            if (input.name === 'word_original') {
                original = input.value[0].toUpperCase() + input.value.substring(1)
                input.value = ''
            }
            if (input.name === 'word_translate') {
                translate = input.value[0].toUpperCase() + input.value.substring(1)
                input.value = ''
            }
        })
        if (original.length < 2 || translate.length < 2) {
            alert('Укажите правильную длину слова/перевода.')
        } else {
            try {
                await axios.post('/words.json',{userId: localStorage.getItem('userId') ,original, translate})
                alert('Слово добавлено!')
                return inputs
            } catch(e) {
                console.log(e)
            }
        }
    }
}

