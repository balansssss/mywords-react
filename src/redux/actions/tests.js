import {CHANGE_TYPE_TEST, GET_TESTS, NEXT_QUESTION, START_TEST, CLEAR_TEST} from './actionTypes'
import axios from '../../axios/axios'

const changeType = typeTest => {
    return {
        type: CHANGE_TYPE_TEST,
        typeTest
    }
}

export const selectChangeHandler = event => {
    return dispatch => {
        const typeTest = event.target.value
        dispatch(changeType(typeTest))
    }
}

const getTests = test => {
    return {
        type: GET_TESTS,
        test
    }
}

const start = () => {
    return {
        type: START_TEST
    }
}

export const startTest = state => {
    return async (dispatch, getState) => {
        const min = Number(state.inputsParameters[0].value)
        const max = Number(state.inputsParameters[1].value)
        if (min <= max && min >= Number(state.inputsParameters[0].min)) {
            const typeTest = getState().testsReducer.typeTest
            const inputsTest = [...state.inputsTest]
            try {
                let words = {}
                let test = {}
                await axios.get('/words.json').then(response => {
                    const dataKeys = Object.keys(response.data)
                    dataKeys.forEach(data => {
                        if (response.data[data].userId === localStorage.getItem('userId')) {
                            words[data] = response.data[data]
                        }
                    })
                    Object.keys(words).slice(min-1,max).map(i => {
                        test[i] = words[i]
                    })
                    dispatch(getTests(test))
                    inputsTest.forEach(input => {
                        if (input.name === `word_${typeTest}`) {
                            input.value = getState().testsReducer.test[Object.keys(getState().testsReducer.test)[0]][typeTest]
                            input.readonly = true
                        }
                    })
                    dispatch(start())
                })
            } catch(e) {
                console.log(e)
            }

        } else {
            alert('Некоректнные данные')
        }
    }
}

const testSubmit = (inputsTest, currentQuestion, points, startTest) => {
    return {
        type: NEXT_QUESTION,
        inputsTest,
        currentQuestion,
        points,
        startTest
    }
}

const clearTest = () => {
    return {
        type: CLEAR_TEST
    }
}

export const testSubmitHandler = state => {
    return async (dispatch, getState) => {
            let currentQuestion = getState().testsReducer.currentQuestion
        let points = getState().testsReducer.points
        let startTest = true
        const inputsTest = [...state.inputsTest]
        let checkType = getState().testsReducer.typeTest === 'original' ? 'translate' : 'original'
        inputsTest.forEach(input => {
            if (input.name === `word_${checkType}`) {
                if (input.value.toLowerCase() === getState().testsReducer.test[Object.keys(getState().testsReducer.test)[currentQuestion]][checkType].toLowerCase()) {
                    points++
                }
                input.value = ''
            } else if (input.name === `word_${getState().testsReducer.typeTest}` && currentQuestion + 1 < Object.keys(getState().testsReducer.test).length) {
                input.value = getState().testsReducer.test[Object.keys(getState().testsReducer.test)[currentQuestion + 1]][getState().testsReducer.typeTest]
            }
        })
        currentQuestion++
        dispatch(testSubmit(inputsTest, currentQuestion, points, startTest))
        if (currentQuestion === Object.keys(getState().testsReducer.test).length) {
            alert(`Ваш результат - ${points}`)
            dispatch(clearTest())
            return {
                inputsTest: [
                    {
                        type: 'text',
                        name: 'word_original',
                        placeholder: '',
                        value: '',
                        title: 'Минимальная длина слова 2',
                        readonly: false
                    },
                    {
                        type: 'text',
                        name: 'word_translate',
                        placeholder: '',
                        value: '',
                        title: 'Минимальная длина слова 2',
                        readonly: false
                    },
                    {
                        type: 'submit',
                        value: 'Далее',
                    }
                ],
                inputsParameters: [
                    {
                        type: 'number',
                        name: 'min',
                        title: 'Номер слова - начало теста',
                        min: 1,
                        value: 1,
                    },
                    {
                        type: 'number',
                        name: 'max',
                        title: 'Номер слова - окончание теста',
                        value: 1,
                    },
                    {
                        type: 'submit',
                        value: 'Начать',
                    }
                ]
            }
        }

    }
}