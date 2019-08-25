import React from 'react'
import { apiCall } from '../../../services/apiService'
import './UserProfilePage.css'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import linkedInLogo from '../../../assets/LinkedIn_logo.png'


class UserProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    this.fetchUserInfo()
  }

  fetchUserInfo = async () => {
    const response = await apiCall.get(`/users/${this.props.match.params.id}`)
    const {
      data: {
        user: { name, username, email, linkedin, projects, imgUrl }
      }
    } = response
    this.setState({
      name,
      username,
      email,
      linkedin,
      projects, 
      imgUrl
    })
  }

  renderProjects = () => {
    const { projects } = this.state
    console.log(this.state.projects)
    return projects.map(project => {
      return (
        <Carousel.Item key={project.id} className="user-project">
          <h3>{project.name}</h3>
          <Link to={`/project/${project.id}`}>
            <img
              src={project.imgUrl}
              alt="ProjPic"
              className="profile-project-pic"
            />
          </Link>
        </Carousel.Item>
      )
    })
  }

  render() {
    const { name, username, email, linkedin } = this.state
    return (
      <div className="pro-proj-container">
       <div className = 'profile-container'>
            <div className='profile-left'>
              <img src={this.state.imgUrl} className="profile-image"/>
            </div>
            <div className='profile-right'>
              <h1 className="prof-name">{name}</h1>
              <h2 className="prof-username">{username}</h2>
              <h3 className="prof-email">{email}</h3>
              <a href={linkedin}><img className="linkedin-logo" src={linkedInLogo}/></a>
              <h3 className="prof-linkedin">{linkedin}</h3>
            </div>
          </div>
        <Carousel className="user-project-list">
          {this.renderProjects()}
        </Carousel>
      </div>
    )
  }
}

export default UserProfilePage
