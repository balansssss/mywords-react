import React from 'react'
import classes from './Vocabulary.module.scss'
import NavItem from '../../components/NavItem/NavItem'
import Input from '../../components/Input/Input'
import EditIcon from './pencil.svg'
import DeleteIcon from './cancel.svg'

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
        const resultWords =[]
        this.state.words.forEach(word=>{
            if (word[this.state.typeSearch].toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                resultWords.push(word)
            }
        })
        this.setState({
            stringSearch: value,
            resultsSearch: resultWords
        })
    }

    selectChangeHandler = event => {
        const typeSearch = event.target.value
        this.setState({
            typeSearch
        })
    }

    editWord = id => {
        const words =[...this.state.words]
        const editOriginal = prompt('Слово', words[id].original)
        const editTranslate = prompt('Перевод', words[id].translate)
        if (editOriginal && editTranslate) {
            const word = {
                original: editOriginal,
                translate: editTranslate
            }
            words.splice(id,1,word)
            this.setState({
                words
            })
        }
    }

    deleteWord = id => {
        const words = [...this.state.words]
        words.splice(id,1)
        this.setState({
            words
        })
    }

    renderTr = (arr) => {
        return arr.map((word, index)=>{
            return (
                <tr key={`word_${index}`}>
                    <td>{index+1}</td>
                    <td>{word.original}</td>
                    <td>{word.translate}</td>
                    <td className={classes.icon}>
                        <img src={EditIcon} alt="Редактировать" title="Редактировать" onClick={this.editWord.bind(this, index)}/>
                        <img src={DeleteIcon} alt="Удалить" title="Удалить" onClick={this.deleteWord.bind(this, index)}/>
                    </td>
                </tr>
            )
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
                                <option value='original'>Поиск по слову</option>
                                <option value='translate'>Поиск по переводу</option>
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
                                    this.state.resultsSearch.length === 0
                                    ?   this.state.words.length > 0 && this.state.stringSearch.length === 0
                                        ? this.renderTr(this.state.words)
                                        : <tr><td colSpan='4'>Слова не найдены.</td></tr>
                                    : this.renderTr(this.state.resultsSearch)
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