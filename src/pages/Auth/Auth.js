import React from 'react'
import classes from './Auth.module.scss'
import logo from './logo2.png'
import translate from './translate.png'
import Input from "../../components/Input/Input";

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
                type: 'submit',
                value: 'Войти'
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