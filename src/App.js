import React from 'react'
import Main from './pages/Main/Main'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Tests from './pages/Tests/Tests'
import Vocabulary from './pages/Vocabulary/Vocabulary'
import Auth from './pages/Auth/Auth'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers/rootReducer'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))


class App extends React.Component {
    state = {
        isAuth: Boolean(localStorage.getItem('token'))
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    { this.state.isAuth
                        ? <Switch>
                            <Route path='/' exact component={Main}/>
                            <Route path='/tests' exact component={Tests}/>
                            <Route path='/vocabulary' exact component={Vocabulary}/>
                            <Redirect to='/'/>
                        </Switch>
                        : <Switch>
                            <Route path='/' exact component={Auth}/>
                            <Redirect to='/'/>
                        </Switch>
                    }
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
