import React from 'react'
import classes from './Tests.module.scss'
import Input from '../../components/Input/Input'
import NavItem from '../../components/NavItem/NavItem'
import {connect} from 'react-redux'
import {selectChangeHandler, startTest, testSubmitHandler} from '../../redux/actions/tests'

class Tests extends React.Component {

    state = {
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
        this.props.startTest(this.state)
    }

    testSubmitHandler = async event => {
        event.preventDefault()
        await this.props.testSubmitHandler(this.state).then(response => {
            if (response) {
                this.setState({
                    inputsTest: response.inputsTest,
                    inputsParameters: response.inputsParameters
                })
            }
        })
    }

    render() {
        return (
            <div className={classes.container}>
                <NavItem title='Главная' path='/' className='nav_left'/>

                    {this.props.statusTest
                        ? <form onSubmit={event => this.testSubmitHandler(event)}>
                            <span>Вопрос {this.props.currentQuestion+1} из {Object.keys(this.props.test).length}</span>
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
                            <select onChange={this.props.selectChangeHandler}>
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
                                    min={input.minLength}
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

const mapStateToProps = state => {
    return {
        statusTest: state.testsReducer.statusTest,
        typeTest: state.testsReducer.typeTest,
        test: state.testsReducer.test,
        currentQuestion: state.testsReducer.currentQuestion,
        points: state.testsReducer.points
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectChangeHandler: event => dispatch(selectChangeHandler(event)),
        startTest: state => dispatch(startTest(state)),
        testSubmitHandler: state => dispatch(testSubmitHandler(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tests)