import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showError: false
    }
  }

  handleSubmitForm = async (evt) => {
    evt.preventDefault()
    const { username, password } = this.state
    const { handleLogin } = this.props

    try {
      await handleLogin({ username, password })
    }
    catch (error) {
      this.setState(() => {
        return { showError: true }
      })
      throw error
    }
    await this.props.history.push('/')
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
      <Fragment>
        <h2>Login</h2>
        {errMessage}
        <form className='form' onSubmit={this.handleSubmitForm}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              onChange={this.handleTextInput}
              defaultValue={this.state.username}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              onChange={this.handleTextInput}
              defaultValue={this.state.password}
            />
          </div>
          <button>Login</button>
        </form>
        <Link to='/user/signup'>create new account</Link>
      </Fragment>
    )
  }
}

export default LoginForm