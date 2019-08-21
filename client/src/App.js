import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom'
import HomePage from './components/screens/HomePage'
import Project from './components/screens/Project'
import SignUpForm from './components/screens/SignUpForm'
import LoginForm from './components/screens/LoginForm';
import UploadProject from './components/screens/UploadProject/index'

import { login, signUp, getProfile } from './services/apiService'
import authService from './services/authService';
import ProtectedRoute from './components/ProtectedRoute'
// import Axios from 'axios'

// export const apiCall = Axios.create({ baseURL: "http://localhost:8001" })


export default class App extends React.Component {
  state = {
    user: {},
    isSignedIn: false
  }

  componentDidMount = async () => {
    try {
      const fetchUser = await getProfile()
      this.setState(state => {
        return {
          isSignedIn: authService.isAuthenticated(),
          user: fetchUser
        }
      })
    }
    catch (error) {
      throw error
    }
  }

  loginUser = async (credentials) => {
    try {
      const user = await login(credentials)

      this.setState(state => {
        return {
          isSignedIn: true,
          user: user
        }
      });
    }
    catch (error) {
      throw error
    }
  }

  signUpUser = async (credentials) => {
    try {
      await signUp(credentials)
      const newUser = await { username: credentials.username, password: credentials.password }
      this.loginUser(newUser)
    }
    catch (error) {
      throw error
    }
  }

  signOutUser = () => {
    authService.signOut()

    this.setState(state => {
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
        <nav>
          <Link to="/">Homepage</Link>
          <Link to="/project/2">Project</Link>
          {
            isSignedIn && (
              <div>
                <button onClick={this.signOutUser}>Signout</button>
              </div>
            )
          }
          {
            !isSignedIn &&
            <Link to='/user/login'>Login</Link>
          }
          {
            isSignedIn &&
            <Link to="/upload">Upload New Project</Link>
          }
         
        </nav>
        <main>

          <Route
            exact path="/"
            render={(props) => <HomePage
              {...props}
              handleLogin={this.loginUser}
              isSignedIn={isSignedIn}
            />}
            // component={HomePage}
          />
          <Route
            exact path="/project/:id"
            component={Project}
          />
          <Route
            path="/user/signup"
            render={(props) => <SignUpForm
              {...props}
              handleSignUp={this.signUpUser}
            />}
            />
          {/* <Route
            path="/user/login"
            render={(props) => <LoginForm
              {...props}
              handleLogin={this.loginUser}
              isSignedIn={isSignedIn}
            />}

          /> */}

          <Route
            exact path="/upload"
            component={UploadProject}

          />
          <ProtectedRoute
            path='/dashboard'
          user={user}
          component={HomePage}
          />

        </main>
      </div>
    );
  }
}


