import React from 'react'
import { apiCall } from '../../../services/apiService'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import linkedInLogo from '../../../assets/LinkedIn_logo.png'
import './Dashboard.css'

class Dashboard extends React.Component {
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
    const response = await apiCall.get(`/users/${localStorage.getItem('userId')}`)
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

  deleteProject = async (id) => {
    await apiCall.delete(`project/${id}`)
    await this.fetchUserInfo()
  }

  renderProjects = () => {
    const { projects } = this.state
    console.log(this.state.projects)
    return projects.map(project => {
      return (
        <Carousel.Item key={project.id} className="user-project">
          <div className='project-header'>
            <Link to={`/project/update/${project.id}`}><button>Edit</button></Link>
            <h3>{project.name}</h3>
            <button onClick={() => this.deleteProject(project.id)}>Delete</button>
          </div>
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
        <div className="prof-header">
          <div className='profile-container'>
            <div className='profile-left'>
              <img className="profile-image" src={this.state.imgUrl} alt='profile-pic' />
            </div>
            <div className='profile-right'>
              <h1 className="prof-name">{name}</h1>
              <h2 className="prof-username">{username}</h2>
              <h3 className="prof-email">{email}</h3>
              <a className='linkedin' href={linkedin}>
                <img className="linkedin-logo" src={linkedInLogo} alt='linkedin' />
                <h3 className="prof-linkedin">{linkedin}</h3>
              </a>
              <Link to={`/users/edit/${this.props.match.params.id}`}>Edit Profile</Link>
            </div>
          </div>

        </div>
        <Carousel className="user-project-list">
          {this.renderProjects()}
        </Carousel>
      </div>
    )
  }
}

export default Dashboard
