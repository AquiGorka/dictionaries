import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Store } from './Store'
import Layout from './components/Layout'
import Dictionaries from './screens/Dictionaries'
import Dictionary from './screens/Dictionary'

const { PUBLIC_URL = '' } = process.env

function App() {
  return (
    <Store>
      <Layout>
        <Router basename={'/dictionaries'}>
          <Switch>
            <Route exact path={`${PUBLIC_URL}/:id`} component={Dictionary} />
            <Route path={`${PUBLIC_URL}/`} component={Dictionaries} />
          </Switch>
        </Router>
      </Layout>
    </Store>
  )
}

export default App
