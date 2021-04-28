import React from 'react'
import classes from './Vocabulary.module.scss'
import NavItem from '../../components/NavItem/NavItem'
import Input from '../../components/Input/Input'

class Vocabulary extends React.Component {
    state = {
        words: [
            {
                original: 'Hello',
                translate: 'Привет'
            },
            {
                original: 'World',
                translate: 'Мир'
            },
            {
                original: 'Good',
                translate: 'Хорошо'
            }
        ],
        stringSearch: '',
        typeSearch: 'original',
        resultsSearch: []
    }

    submitHandler = event => {
        event.preventDefault()
    }

    inputChangeHandler = event => {
        const value = event.target.value
        this.setState({
            stringSearch: value
        })
    }

    selectChangeHandler = event => {
        const typeSearch = event.target.value
        this.setState({
            typeSearch
        })

    }

    render() {
        return (
            <div className={classes.container}>
                <React.Fragment>
                    <div></div>

                    <div className={classes.middle_container}>
                        <form onSubmit={this.submitHandler}>
                            <Input
                                type='text'
                                name='search_word'
                                placeholder='Поиск слова'
                                value={this.state.stringSearch}
                                onChange={this.inputChangeHandler}
                            />
                            <select onChange={this.selectChangeHandler}>
                                <option value='original_word'>Поиск по слову</option>
                                <option value='translate_word'>Поиск по переводу</option>
                            </select>
                        </form>

                        <table className={classes.words}>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Слово</th>
                                    <th>Перевод</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.words.length > 0
                                    ? this.state.words.map((word, index)=>{
                                        return (
                                            <tr key={`word_${index}`}>
                                                <td>{index+1}</td>
                                                <td>{word.original}</td>
                                                <td>{word.translate}</td>
                                                <td>...</td>
                                            </tr>
                                        )
                                    })
                                    : <tr><td colSpan='3'>В словаре еще нет слов.</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>

                    <NavItem title='Главная' path='/' className='nav_right' />
                </React.Fragment>

            </div>
        )
    }

}

export default Vocabulary