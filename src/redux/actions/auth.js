import {TOGGLE_FORM} from './actionTypes'
import axios from "axios";

export const visibleForm = visible => {
    return {
        type: TOGGLE_FORM,
        visible
    }
}

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

export const authUser = (state, isLogin) => {
    return async dispatch => {
        const formInputs = [...state.formInputs]
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
                    return formInputs
                }
            } catch(e) {
                console.log(e)
                alert('Email или пароль неверные! Попробуйте ещё.')
            }
        } else {
            alert('Введите корректные данные!')
        }
    }
}