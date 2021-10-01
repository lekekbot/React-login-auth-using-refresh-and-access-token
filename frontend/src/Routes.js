//routes.js

import React, { useContext } from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
//pages
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import { TokenContext } from './context/TokenContext'


export default function Routes() {
  const {token} = useContext(TokenContext)

  const authGuard = (Component) => (props) => {
    if(token) {
      return <Component {...props}/>
    } else {
      return <Redirect to ='/'/>
    }
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login/>
        </Route>
        <Route path='/dashboard' render={authGuard(Dashboard)}/>
      </Switch>
    </Router>
  )
}