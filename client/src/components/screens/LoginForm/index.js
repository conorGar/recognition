import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MaterialButton from '@material-ui/core/Button'

import { apiCall } from '../../../services/apiService'

import './LoginForm.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showError: false
    }
  }

  // loginUser = async data => {
  //   try {
  //     const response = await apiCall.post('/auth/login', data)
  //     const {
  //       data: { token }
  //     } = response
  //     await localStorage.setItem('token', token)
  //     this.props.history.push('/')
  //   } catch (error) {
  //     throw error
  //   }
  // }

  handleSubmitForm = async evt => {
    evt.preventDefault()
    const { username, password } = this.state
    const { handleLogin } = this.props
    try {
      await handleLogin({ username, password })
      // await this.props.history.push(`/dashboard/${localStorage.getItem('userId')}`)
      this.props.toggleLoginPopup()

    } catch (error) {
      this.setState(() => {
        return { showError: true }
      })
      throw error
    }
  }

  handleTextInput = async evt => {
    const { name, value } = evt.target

    this.setState({
      [name]: value
    })
  }

  render() {
    const { showError } = this.state

    let errMessage

    if (showError) {
      errMessage = (
        <div>
          <span>Incorrect Username or Password</span>
        </div>
      )
    }

    return (
      <Fragment >
      {/* Hey! Not too familiar with Fragments.... is having a div redundant? a container called 'loginform-hide' is necessary for login popup to show properly */}
      <div className={this.props.currentClass}> {/*  class changed to determine whether the login popup displays or not...*/}
          <h2>Login</h2>
          {errMessage}
          <form className="form" onSubmit={this.handleSubmitForm}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                onChange={this.handleTextInput}
                defaultValue={this.state.username}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleTextInput}
                defaultValue={this.state.password}
              />
            </div>
            <button className="login-button">Login</button>
          </form>
          <div className="signup-button" onClick={this.props.toggleSignupPopup}>Create New Account</div>
          {/* <Link to="/user/signup">create new account</Link> */}
          <div className="close-button" onClick={this.props.toggleLoginPopup}>X</div>
      </div>
    </Fragment>
    )
  }
}

export default LoginForm
