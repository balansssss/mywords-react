import React from 'react'
import Main from './pages/Main/Main'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Tests from './pages/Tests/Tests'
import Vocabulary from './pages/Vocabulary/Vocabulary'


function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path='/' exact component={Main}/>
              <Route path='/tests' exact component={Tests}/>
              <Route path='/vocabulary' exact component={Vocabulary}/>
              <Redirect to='/' />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
