import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import {
  ForgotPassword,
  Home,
  PetSelect,
  PetAdd,
  Signin,
  Signup,
  Options,
} from './components'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to='/signin' />
        )
      }}
    ></Route>
  )
}

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <Route path='/add' component={PetAdd} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/options' component={Options} />
          <Route path='/petselect' component={PetSelect} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
