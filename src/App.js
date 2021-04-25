import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import {
  ForgotPassword,
  Home,
  PetAdd,
  PetDetails,
  PetSelect,
  Signin,
  Signup,
  Options,
  UserName,
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
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)

  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute path='/add' component={PetAdd} />
            <Route path='/forgot-password' component={ForgotPassword} />
            <PrivateRoute path='/options' component={Options} />
            <PrivateRoute path='/petselect' component={PetSelect} />
            <PrivateRoute path='/petdetails' component={PetDetails} />
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <PrivateRoute path='/user-name' component={UserName} />
          </Switch>
        </UserProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
