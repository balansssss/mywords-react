import React from 'react'
import classes from './Auth.module.scss'
import logo from './logo2.png'
import translate from './translate.png'
import Input from '../../components/Input/Input'
import axios from 'axios'

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePassword = password => {
    if (password.length < 3) {
        password = false
    }
    return password
}

class Auth extends React.Component {

    state = {
        showForm: false,
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

    showForm = () => {
        this.setState({
            showForm: true
        })
    }

    hideForm = () => {
        this.setState({
            showForm: false
        })
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

    authUser = async (isLogin) => {
        const formInputs = [...this.state.formInputs]
        const email = formInputs[0].value
        const password = formInputs[1].value
        if (validateEmail(email) && validatePassword(password)) {
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5D0FxckZC8-6l8GKTXjE4mZF1T9MNTFA'

            if (isLogin) {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5D0FxckZC8-6l8GKTXjE4mZF1T9MNTFA'
            }

            try {
                const response = await axios.post(url, {
                    email, password, returnSecureToken: true
                })
                const data = response.data

                const expirationDate = new Date(new Date().getTime() + data.expiresIn * 3600)

                if (isLogin) {
                    localStorage.setItem('token', data.idToken)
                    localStorage.setItem('userId', data.localId)
                    localStorage.setItem('expirationDate', expirationDate)
                    document.location.reload()
                } else {
                    alert('Регистрация прошла успешна!')
                    formInputs[0].value = ''
                    formInputs[1].value = ''
                    this.setState({
                        formInputs
                    })
                }
            } catch(e) {
                console.log(e)
                alert('Email или пароль неверные! Попробуйте ещё.')
            }
        } else {
            alert('Введите корректные данные!')
        }
    }

    render() {
        return (
            <div style={{ overflow: 'hidden'}}>
                <div className={classes.header}>
                    <img src={logo} className={classes.logo}/>
                </div>

                {this.state.showForm
                    ? <div className={classes.content+' '+classes.slideUp} style={{alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                        }}>
                        <span className={classes.back_button} onClick={this.hideForm}>Назад &#8635;</span>
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
                                <button onClick={this.showForm} className={classes.main_button}>Начать &#10148;</button>
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

export default Auth