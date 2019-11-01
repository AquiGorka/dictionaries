import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dictionaries from './screens/Dictionaries'
import Dictionary from './screens/Dictionary'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/:id'} component={Dictionary} />
        <Route path={'/'} component={Dictionaries} />
      </Switch>
    </Router>
  )
}

export default App
