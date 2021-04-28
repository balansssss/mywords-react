import React from 'react'
import classes from './Main.module.scss'
import NavItem from "../../components/NavItem/NavItem";
import Input from "../../components/Input/Input";

class Main extends React.Component {
    state = {
        onWheel: false,
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
        ],
        words: []
    }

    wheelHandler = event => {
        const pos = event.deltaY
        if (pos>0 && !this.state.onWheel) {
            this.setState({
                onWheel: true
            })
        } else if (pos<0 && this.state.onWheel) {
            this.setState({
                onWheel: false
            })
        }
    }

    showForm = () => {
        this.setState({
            onWheel: true
        })
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

    onSubmitHandler = event => {
        event.preventDefault()
        let original = ''
        let translate = ''
        const inputs = [...this.state.inputs]
        inputs.forEach(input => {
            if (input.name === 'word_original') {
                original = input.value
                input.value = ''
            }
            if (input.name === 'word_translate') {
                translate = input.value
                input.value = ''
            }
        })
        if (original.length < 2 || translate.length < 2) {
            alert('Укажите правильную длину слова/перевода.')
        } else {
            const words = [...this.state.words]
            words.push({original, translate})
            this.setState({
                inputs,
                words
            })
        }
    }

    render() {
        return (
            <div className={classes.container} onWheel={this.wheelHandler}>
                <React.Fragment>
                    <NavItem title='Словарь' path='/vocabulary' className='nav_left' />
                {
                    this.state.onWheel
                        ? <form onSubmit={this.onSubmitHandler}>
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
                                <span onClick={this.showForm} className={classes.show_list}>Добавить слово</span>
                            </div>

                }
                    <NavItem title='Тестирование' path='/tests' className='nav_right' />
                </React.Fragment>

            </div>
        )
    }
}

export default Main