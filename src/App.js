import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, PetSelect, PetAdd } from './components'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/add'>
          <PetAdd />
        </Route>
        <Route exact path='/petselect'>
          <PetSelect />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
