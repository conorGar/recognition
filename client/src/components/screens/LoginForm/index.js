import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MaterialButton from '@material-ui/core/Button'

import { apiCall } from '../../../services/apiService'

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
      await this.props.history.push('/')
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
      <Fragment>
        <h2>Login</h2>
        {showError ? (
          <div
            style={{
              border: 'red 1px solid',
              backgroundColor: '#FAE2E2',
              padding: `${10}px`,
              display: 'inline-table'
            }}
          >
            {errMessage}
          </div>
        ) : (
          ''
        )}
        <form className="form" >
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={this.handleTextInput}
              value={this.state.username}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleTextInput}
              value={this.state.password}
            />
          </div>
          <MaterialButton
                variant="contained"
                onClick={this.handleSubmitForm}
                style={{ margin: `${20}px` }}
              >
                Login
              </MaterialButton>
        </form>
        <Link to="/user/signup">Create Account</Link>
      </Fragment>
    )
  }
}

export default LoginForm
