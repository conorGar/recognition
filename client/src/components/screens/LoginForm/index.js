import React from 'react'
import { apiCall } from '../../../App'
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
      this.setState(prevState => {
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
          <span>an error occured please try again</span>
        </div>
      )
    }

    return (
      <div>
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
      </div>
    )
  }
}

export default LoginForm