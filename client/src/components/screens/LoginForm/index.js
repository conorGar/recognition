import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { apiCall } from '../../../App'


import './LoginForm.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showError: false
    }
  }

  loginUser = async (data) => {
    try {
      const response = await apiCall.post('/auth/login', data)
      const { data: { token } } = response
      localStorage.setItem('token', token)
      await this.props.history.push('/')
    }
    catch (error) {
      throw error
    }
  }

  handleSubmitForm = async (evt) => {
    evt.preventDefault()
    const { username, password } = this.state

    try {
      await this.loginUser({ username, password })
    }
    catch (error) {
      this.setState(() => {
        return { showError: true }
      })
      throw error
    }
  }

  handleTextInput = async (evt) => {
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
        <form className='form' onSubmit={this.handleSubmitForm}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              onChange={this.handleTextInput}
              value={this.state.username}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              onChange={this.handleTextInput}
              value={this.state.password}
            />
          </div>
          <button>Login</button>
        </form>
        <Link to='/user/signup'>create new account</Link>
        </div>
      </Fragment>
    )
  }
}

export default LoginForm