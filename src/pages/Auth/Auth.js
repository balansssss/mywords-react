import React from 'react'
import classes from './Auth.module.scss'
import logo from './logo2.png'
import translate from './translate.png'

class Auth extends React.Component {
    state = {
        showForm: false
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
                            <input type="email" placeholder="Email" name="email" required/>
                            <input type="password" placeholder="Пароль" name="password" required minLength="6"
                                   maxLength="16"/>
                            <input type="submit" value="Войти"/>
                        </form>
                    </div>

                    : <div className={classes.content+' '+classes.slideDown}>
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