import React from 'react'
import Main from './pages/Main/Main'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Tests from './pages/Tests/Tests'
import Vocabulary from './pages/Vocabulary/Vocabulary'
import Auth from './pages/Auth/Auth'


class App extends React.Component {
    state = {
        isAuth: false
    }

    render() {
        return (
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
        );
    }
}

export default App;
