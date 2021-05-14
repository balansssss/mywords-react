import React from 'react'
import classes from './Main.module.scss'
import NavItem from '../../components/NavItem/NavItem'
import Input from '../../components/Input/Input'
import {connect} from 'react-redux'
import {showForm, wheelHandler, onSubmitHandler} from '../../redux/actions/main'
import {logout} from '../../redux/actions/auth'

class Main extends React.Component {
    state = {
        inputs: [
            {
                type: 'text',
                name: 'word_original',
                placeholder: 'Слово',
                value: '',
                title: 'Минимальная длина слова 2',
            },
            {
                type: 'text',
                name: 'word_translate',
                placeholder: 'Перевод',
                value: '',
                title: 'Минимальная длина слова 2',
            },
            {
                type: 'submit',
                value: 'Добавить',
            }
        ]
    }

    onChangeHandler = (event, nameInput) => {
        const value = event.target.value
        const inputs = [...this.state.inputs]
        this.state.inputs.forEach((i)=>{
            if (i.name === nameInput) {
                i.value = value
            }
        })
        this.setState({
            inputs
        })
    }

    onSubmitHandler = async event => {
        event.preventDefault()
        await this.props.onSubmitHandler(this.state).then((response)=>{
            this.setState({
                inputs: response
            })
        })
    }

    componentDidMount() {
        setTimeout(this.logout,24*60*60*1000)
    }

    render() {
        return (
            <div className={classes.container} onWheel={this.props.wheelHandler}>
                <a className={classes.logout} onClick={this.props.logout}>Выйти</a>
                <React.Fragment>
                    <NavItem title='Словарь' path='/vocabulary' className='nav_left' />
                {
                    this.props.onWheel
                        ? <form onSubmit={this.onSubmitHandler}>
                            <span style={{textAlign: 'center'}}>Новое слово</span>
                            {this.state.inputs.map((input, index)=>{
                                return <Input
                                    key={index}
                                    name={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    title={input.title || null}
                                    value={input.value || ''}
                                    onChange={input.type === 'text' ? event => this.onChangeHandler(event, input.name) : null}
                                />
                            })}
                        </form>
                        :
                            <div className={classes.container_column}>
                                <h1 className={classes.container_name}>MyWords</h1>
                                <span onClick={this.props.showForm} className={classes.show_list}>Добавить слово</span>
                            </div>

                }
                    <NavItem title='Тестирование' path='/tests' className='nav_right' />
                </React.Fragment>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        onWheel: state.mainReducer.onWheel
    }
}

const mapDispatchToProps = dispatch => {
    return {
        wheelHandler: event => dispatch(wheelHandler(event)),
        showForm: () => dispatch(showForm()),
        onSubmitHandler: state => dispatch(onSubmitHandler(state)),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)