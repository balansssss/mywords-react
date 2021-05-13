import React from 'react'
import classes from './Vocabulary.module.scss'
import NavItem from '../../components/NavItem/NavItem'
import Input from '../../components/Input/Input'
import EditIcon from './pencil.svg'
import DeleteIcon from './cancel.svg'
import axios from '../../axios/axios'
import Loader from '../../components/Loader/Loader'
import {connect} from 'react-redux'
import {editWord, deleteWord, getWords, inputChangeHandler, selectChangeHandler} from '../../redux/actions/vocabulary'

const userId = localStorage.getItem('userId')

class Vocabulary extends React.Component {

    submitHandler = event => {
        event.preventDefault()
    }

    renderTr = (arr) => {
        return Object.keys(arr).map((word, index)=>{
            return (
                <tr key={`word_${index}`}>
                    <td>{index+1}</td>
                    <td>{arr[word].original}</td>
                    <td>{arr[word].translate}</td>
                    <td className={classes.icon}>
                        <img src={EditIcon} alt="Редактировать" title="Редактировать" onClick={this.props.editWord.bind(this, word)}/>
                        <img src={DeleteIcon} alt="Удалить" title="Удалить" onClick={this.props.deleteWord.bind(this, word)}/>
                    </td>
                </tr>
            )
        })
    }

    componentDidMount = () => {
        this.props.getWords()
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
                                value={this.props.stringSearch}
                                onChange={this.props.inputChangeHandler}
                            />
                            <select onChange={this.props.selectChangeHandler}>
                                <option value='original'>Поиск по слову</option>
                                <option value='translate'>Поиск по переводу</option>
                            </select>
                        </form>

                        {
                            this.props.loading
                                ? <Loader/>
                                : <table className={classes.words}>
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
                                            this.props.resultsSearch.length === 0
                                                ? Object.keys(this.props.words).length > 0 && this.props.stringSearch.length === 0
                                                ? this.renderTr(this.props.words)
                                                : <tr>
                                                    <td colSpan='4'>Слова не найдены.</td>
                                                </tr>
                                                : this.renderTr(this.props.resultsSearch)
                                        }
                                        </tbody>
                                    </table>
                        }
                    </div>

                    <NavItem title='Главная' path='/' className='nav_right' />
                </React.Fragment>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.vocabularyReducer.loading,
        words: state.vocabularyReducer.words,
        stringSearch: state.vocabularyReducer.stringSearch,
        typeSearch: state.vocabularyReducer.typeSearch,
        resultsSearch: state.vocabularyReducer.resultsSearch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        inputChangeHandler: event => dispatch(inputChangeHandler(event)),
        getWords: () => dispatch(getWords()),
        selectChangeHandler: event => dispatch(selectChangeHandler(event)),
        editWord: word => dispatch(editWord(word)),
        deleteWord: word => dispatch(deleteWord(word))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vocabulary)