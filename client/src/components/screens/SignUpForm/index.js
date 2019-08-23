import React, { Fragment } from 'react'
import { apiCall } from '../../../services/apiService'
import './SignUpForm.css'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showError: false
    }
  }

  handleSubmitForm = async evt => {
    evt.preventDefault()

    const { name, username, password, email, linkedin } = this.state
    const { handleSignUp } = this.props

    try {
      await handleSignUp({ name, username, password, email, linkedin })
      // await this.props.history.push('/')
      this.props.toggleSignupPopup()

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
          <span>couldn't register account try new username</span>
        </div>
      )
    }
    return (
     
      <Fragment>
        <div className={this.props.currentClass}>
          <h2>Signup</h2>
          {errMessage}
          <form className="form" onSubmit={this.handleSubmitForm}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                required
                type="text"
                name="name"
                onChange={this.handleTextInput}
                value={this.state.name}
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                required
                type="text"
                name="username"
                onChange={this.handleTextInput}
                value={this.state.username}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                name="password"
                onChange={this.handleTextInput}
                value={this.state.password}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                required
                type="text"
                name="email"
                onChange={this.handleTextInput}
                value={this.state.email}
              />
            </div>
            <div>
              <label htmlFor="linkedin">Linkedin</label>
              <input
                required
                type="text"
                name="linkedin"
                onChange={this.handleTextInput}
                value={this.state.linkedin}
              />
            </div>
            <button className='signup-button-2'>Sign Up</button>
          </form>
          <div className="close-button" onClick={this.props.toggleSignupPopup}>X</div>
        </div>
      </Fragment>
    )
  }
}

export default SignUpForm
