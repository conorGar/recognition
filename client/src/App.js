import React from 'react'
import './App.css'
import { Route, Link } from 'react-router-dom'
import HomePage from './components/screens/HomePage'
import Project from './components/screens/Project'
import SignUpForm from './components/screens/SignUpForm'
import LoginForm from './components/screens/LoginForm'
import UserProfilePage from './components/screens/UserProfilePage'
import { login, signUp, getProfile } from './services/apiService'
import authService from './services/authService'
import ProtectedRoute from './components/ProtectedRoute'
import HideAppBar from './components/HideAppBar'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  this.state = {
    user: {},
    isSignedIn: false,

  }
  }
  componentDidMount = async () => {
    try {
      const fetchUser = await getProfile()
      this.setState(() => {
        return {
          isSignedIn: authService.isAuthenticated(),
          user: fetchUser
        }
      })
    } catch (error) {
      throw error
    }
  }

  loginUser = async credentials => {
    try {
      const user = await login(credentials)
      this.setState(state => {
        return {
          isSignedIn: true,
          user: user
        }
      })
    } catch (error) {
      throw error
    }
  }

  signUpUser = async credentials => {
    try {
      await signUp(credentials)
      const newUser = await {
        username: credentials.username,
        password: credentials.password
      }
      this.loginUser(newUser)
    } catch (error) {
      throw error
    }
  }

  signOutUser = async () => {
    authService.signOut()
    await this.setState(state => {
      return {
        isSignedIn: false,
        user: {}
      }
    })
  }

  render() {
    const { isSignedIn, user } = this.state
    return (
      <div className="App">
        <HideAppBar signOutUser={this.signOutUser} isSignedIn={isSignedIn} />

        <main>
          ​
          <Route
            exact
            path="/"
            render={props => <HomePage {...props} isSignedIn={isSignedIn} />}
          />
          <Route exact path="/user/:id" component={UserProfilePage} />
          <Route exact path="/project/:id" component={Project} />
          <Route
            path="/user/signup"
            render={props => (
              <SignUpForm {...props} handleSignUp={this.signUpUser} />
            )}
          />
          <Route
            path="/user/login"
            render={props => (
              <LoginForm {...props} handleLogin={this.loginUser} />
            )}
          />
          <div>
            <ProtectedRoute
              path="/dashboard"
              user={user}
              component={HomePage}
            />
            ​{' '}
          </div>
          {/* <Link to="/user/1">Profile Page</Link> */}

        </main>
      </div>
    )
  }
}
