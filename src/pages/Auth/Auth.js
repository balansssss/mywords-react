import React from 'react'
import classes from './Auth.module.scss'
import logo from './logo2.png'
import translate from './translate.png'
import Input from '../../components/Input/Input'
import {connect} from 'react-redux'
import {visibleForm, authUser} from '../../redux/actions/auth'

class Auth extends React.Component {

    state = {
        formInputs: [
            {
                type: 'email',
                name: 'email',
                placeholder: 'Email',
                value: ''
            },
            {
                type: 'password',
                name: 'password',
                placeholder: 'Пароль',
                value: ''
            },
            {
                type: 'button',
                value: 'Войти',
                isLogin: true
            },
            {
                type: 'button',
                value: 'Регистрация',
                isLogin: false
            }
        ]
    }

    onChangeHandler = (event, inputName) => {
        const formInputs = [...this.state.formInputs]
        formInputs.forEach(input => {
            if (input.name === inputName) {
                input.value = event.target.value
            }
        })
        this.setState({
            formInputs
        })
    }

    authUser = async isLogin => {
        await this.props.authUser(this.state, isLogin).then(response => {
            if (response) {
                this.setState({
                    formInputs: response
                })
            }
        })
    }

    render() {
        return (
            <div style={{ overflow: 'hidden'}}>
                <div className={classes.header}>
                    <img src={logo} className={classes.logo}/>
                </div>

                {this.props.showForm
                    ? <div className={classes.content+' '+classes.slideUp} style={{alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                        }}>
                        <span className={classes.back_button} onClick={()=> this.props.visibleForm(false)}>Назад &#8635;</span>
                        <form id="signInForm" className={classes.forms}>
                            <label>Авторизация</label>
                            { this.state.formInputs.map((input, index) => {
                                return <Input
                                    key={index}
                                    name={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={input.value || ''}
                                    onChange={input.type !== 'submit' ? event => this.onChangeHandler(event, input.name) : null}
                                    onClick={input.type === 'button' ? () => this.authUser(input.isLogin) : null}
                                />
                            })}
                        </form>
                    </div>

                    : <div className={classes.content + ' ' + classes.slideDown}>
                        <div className={classes.content_info}>
                            <h2>Твой<br/>персональный<br/>словарь</h2>
                            <div className={classes.content_footer}>
                                <button onClick={() => this.props.visibleForm(true)} className={classes.main_button}>Начать &#10148;</button>
                                <span>WEB-приложение является универсальным словарем, содержащее в себе интерфейсы изучения и тестирования иностранных языков.</span>
                            </div>
                        </div>
                        <div className={classes.content_info}>
                            <img src={translate} className={classes.main}/>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        showForm: state.authReducer.showForm
    }
}

const mapDispatchToProps = dispatch => {
    return {
        visibleForm: visible => dispatch(visibleForm(visible)),
        authUser: (state, isLogin) => dispatch(authUser(state, isLogin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)