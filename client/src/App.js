import React from 'react'
import './App.css'
import { Route, Link, Redirect } from 'react-router-dom'
import HomePage from './components/screens/HomePage'
import Project from './components/screens/Project'
import SignUpForm from './components/screens/SignUpForm'
import LoginForm from './components/screens/LoginForm'
import UserProfilePage from './components/screens/UserProfilePage'
import EditUserPage from './components/screens/EditUserPage/index'
import { login, signUp, getProfile } from './services/apiService'
import authService from './services/authService'
import ProtectedRoute from './components/ProtectedRoute'
import HideAppBar from './components/HideAppBar'
import Dashboard from './components/screens/Dashboard'
import UploadProject from './components/screens/UploadProject';
import EditProject from './components/screens/EditProject'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      isSignedIn: false,
      showLoginForm: 'loginform-hide',
      showSignupForm: 'signup-hide'
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

  updateLoginPopup = () => {
    if (this.state.showLoginForm === 'loginform-hide') {
      this.setState({
        showLoginForm: 'loginform-show'
      })
    } else {
      this.setState({
        showLoginForm: 'loginform-hide'
      })
    }
  }

  updateSignupPopup = () => {
    console.log('Got to update signup popup')
    if (this.state.showSignupForm === 'signup-hide') {
      this.setState({
        showSignupForm: 'signup-show',
        showLoginForm: 'loginform-hide'
      })
    } else {
      this.setState({
        showSignupForm: 'signup-hide'
      })
    }
  }

  render() {
    const { isSignedIn, user } = this.state
    return (
      <div className="App">
        <HideAppBar
          signOutUser={this.signOutUser}
          isSignedIn={isSignedIn}
          updatePopupStatus={this.updateLoginPopup}
        />

        <main>
          ​
          <Route
            exact
            path="/"
            render={props => <HomePage {...props} isSignedIn={isSignedIn} />}
          />
          <Route exact path="/project/:id" component={Project} />
          <Route
            exact
            path="/user/signup"
            render={props => <SignUpForm {...props} handleSignUp={this.signUpUser} />}
          />
          <div>
            <ProtectedRoute
              path="/dashboard/:id"
              user={user}
              component={Dashboard}
            />
            ​{' '}
          </div>
          {/* <Link to="/user/1">Profile Page</Link> */}
          <LoginForm
            handleLogin={this.loginUser}
            currentClass={this.state.showLoginForm}
            toggleLoginPopup={this.updateLoginPopup}
            toggleSignupPopup={this.updateSignupPopup}
            isSignedIn={isSignedIn}
          />
          <SignUpForm
            handleSignUp={this.signUpUser}
            currentClass={this.state.showSignupForm}
            toggleSignupPopup={this.updateSignupPopup}
            isSignedIn={isSignedIn}
            handleSignUp={this.signUpUser}
          />
        <Route
          exact
          path="/project/upload/user/:id"
          component={UploadProject}
        />
        <Route
          exact
          path="/user/:id"
          render={props => (
            <UserProfilePage {...props} isSignedIn={isSignedIn} />
          )}
        />
        <Route
          exact
          path="/project/update/:id"
          render={props => (
            <EditProject {...props} isSignedIn={isSignedIn} />
          )}
        />
        </main>
         <Route
          exact
          path="/users/edit/:id"
          render={props => (
            <EditUserPage {...props} isSignedIn={isSignedIn} />
          )}
        />
      </div>
    )
  }
}
