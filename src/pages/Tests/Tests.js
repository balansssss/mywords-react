import React from 'react'
import classes from './Tests.module.scss'
import Input from '../../components/Input/Input'
import NavItem from '../../components/NavItem/NavItem'

class Tests extends React.Component {

    state = {
        startTest: false,
        typeTest: 'original',
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
        ],
        test: [
            {
                original: 'Hello',
                translate: 'Привет'
            },
            {
                original: 'World',
                translate: 'Мир'
            }
        ],
        currentQuestion: 0,
        points: 0
    }

    selectChangeHandler = event => {
        const typeTest = event.target.value
        this.setState({
            typeTest
        })
    }

    inputsTestChangeHandler = (event, nameInput) => {
        const value = event.target.value
        const inputsTest = [...this.state.inputsTest]
        this.state.inputsTest.forEach((i)=>{
            if (i.name === nameInput) {
                i.value = value
            }
        })
        this.setState({
            inputsTest
        })
    }

    inputsParametersChangeHandler = (event) => {
        const inputName = event.target.name
        const value = event.target.value
        const inputsParameters = [...this.state.inputsParameters]
        inputsParameters.forEach(input=>{
            if (input.name === inputName ) {
                input.value = value
            }
        })
        this.setState({
            inputsParameters
        })
    }

    startTest = event => {
        event.preventDefault()
        const min = Number(this.state.inputsParameters[0].value)
        const max = Number(this.state.inputsParameters[1].value)
        if (min <= max) {
            const typeTest = this.state.typeTest
            const inputsTest = [...this.state.inputsTest]
            inputsTest.forEach(input => {
                if (input.name === `word_${typeTest}`) {
                    input.value = this.state.test[0][typeTest]
                    input.readonly = true
                }
            })
            this.setState({
                startTest: true,
                inputsTest
            })
        } else {
            alert('Некоректнные данные')
        }

    }

    testSubmitHandler = event => {
        event.preventDefault()
        let currentQuestion = this.state.currentQuestion
        let points = this.state.points
        let startTest = true
        const inputsTest = [...this.state.inputsTest]
        let checkType = this.state.typeTest === 'original' ? 'translate' : 'original'
        inputsTest.forEach(input => {
            if (input.name === `word_${checkType}`) {
                if (input.value.toLowerCase() === this.state.test[currentQuestion][checkType].toLowerCase()) {
                    points++
                }
                input.value = ''
            } else if (input.name === `word_${this.state.typeTest}` && currentQuestion + 1 < this.state.test.length) {
                input.value = this.state.test[currentQuestion + 1][this.state.typeTest]
            }
        })
        currentQuestion++
        this.setState({
            inputsTest,
            currentQuestion,
            points,
            startTest
        })
        if (currentQuestion === this.state.test.length) {
            alert(`Ваш результат - ${points}`)
            this.setState({
                startTest: false,
                typeTest: 'original',
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
                ],
                test: [
                    {
                        original: 'Hello',
                        translate: 'Привет'
                    },
                    {
                        original: 'World',
                        translate: 'Мир'
                    }
                ],
                currentQuestion: 0,
                points: 0
            })
        }

    }

    render() {
        return (
            <div className={classes.container}>
                <NavItem title='Главная' path='/' className='nav_left'/>

                    {this.state.startTest
                        ? <form onSubmit={event => this.testSubmitHandler(event)}>
                            <span>Вопрос {this.state.currentQuestion+1} из {this.state.test.length}</span>
                            {
                                this.state.inputsTest.map((input, index) => {
                                    return <Input
                                        key={index}
                                        name={input.name}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        title={input.title || null}
                                        value={input.value || ''}
                                        readonly={input.readonly}
                                        onChange={input.type === 'text' ? event => this.inputsTestChangeHandler(event, input.name) : null}
                                    />
                                })
                            }
                            </form>
                        : <form onSubmit={event => this.startTest(event)}>
                            <span>Параметры теста:</span>
                            <select onChange={this.selectChangeHandler}>
                                <option value='original'>Оригинал</option>
                                <option value='translate'>Перевод</option>
                            </select>
                            <span style={{textAlign: 'center'}}>Период:</span>
                            { this.state.inputsParameters.map((input, index) => {
                                return <Input
                                    key={index}
                                    name={input.name}
                                    type={input.type}
                                    title={input.title || null}
                                    value={input.value || ''}
                                    onChange={input.type === 'number'
                                        ? event => this.inputsParametersChangeHandler(event): null}
                                />
                                })
                            }
                        </form>
                    }

                <div></div>
            </div>
        )
    }
}

export default Tests