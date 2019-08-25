import React, { Fragment } from 'react'
import { apiCall } from '../../../services/apiService'
import './EditUserPage.css'
import S3FileUpload from 'react-s3';
import { AwsConfig } from '../../../services/AwsConfig'

class EditUserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showError: false,
      imgUrl: ''
    }
  }

  componentDidMount = async () => {
    let id = this.props.match.params.id
    const thisUser = await apiCall.get(`users/edit/${id}`)
    console.log("this user:" + thisUser.data)
    const { name, username, linkedin, email, password, imgUrl } = thisUser.data;
    this.setState({
        name: name,
        username:username,
        linkedin: linkedin,
        email: email,
        password: password,
        imgUrl: imgUrl
    })
}

  handleProjectSubmit = async (e) => {
    e.preventDefault();
    const { name, username, password, email, linkedin, imgUrl } = this.state
    const id = this.props.match.params.id;
    console.log("Handle project submit activate")
    try {
        await apiCall.put(`users/${id}`, { name, username, linkedin, email, password, imgUrl })
        // await this.props.history.push('/')
    }
    catch (error) {
        throw error
    }
}

  handleImageUpload = async (evt) => {
    await S3FileUpload.uploadFile(evt.target.files[0], AwsConfig)
        .then((data) => {
            this.setState({
                imgUrl: data.location
            })
            console.log("Upload success at:" + data.location);
        }).catch((err) => {
            alert(err);
        })
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
          
            <h2>Edit Profile</h2>
            {errMessage}
            <form className="signup-form" onSubmit={this.handleProjectSubmit}>
              <div>
              <label htmlFor="uploadedImage" className='signup-label'>Profile Image</label>

                <input
                    name="uploadedImage"
                    type="file"
                    onChange={this.handleImageUpload}
                    className='signup-input'
                />
              </div>
              <div>
                <label htmlFor="name" className='signup-label'>Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  onChange={this.handleTextInput}
                  value={this.state.name}
                  placeholder="Full Name"
                  className='signup-input'
                  defaultValue={this.state.name}

                />
              </div>
              <div>
                <label htmlFor="username" className='signup-label'>Username</label>
                <input
                  required
                  type="text"
                  name="username"
                  onChange={this.handleTextInput}
                  value={this.state.username}
                  placeholder="Username"
                  className='signup-input'

                />
              </div>
              <div>
                <label htmlFor="password" className='signup-label'>Password</label>
                <input
                  required
                  type="password"
                  name="password"
                  onChange={this.handleTextInput}
                  value={this.state.password}
                  placeholder="Password"
                  className='signup-input'

                />
              </div>
              <div>
                <label htmlFor="email" className='signup-label'>Email</label>
                <input
                  required
                  type="text"
                  name="email"
                  onChange={this.handleTextInput}
                  value={this.state.email}
                  className='signup-input'

                />
              </div>
              <div>
                <label htmlFor="linkedin" className='signup-label'>Linkedin</label>
                <input
                  required
                  type="text"
                  name="linkedin"
                  onChange={this.handleTextInput}
                  value={this.state.linkedin}
                  className='signup-input'

                />
              </div>
              <button className='save-button-2'>Save Changes</button>
            </form>
        </div>
      </Fragment>
    )
  }
}

export default EditUserPage