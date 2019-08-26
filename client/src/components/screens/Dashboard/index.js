import React from 'react'
import { apiCall } from '../../../services/apiService'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import linkedInLogo from '../../../assets/LinkedIn_logo.png'

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
          <h3>{project.name}</h3>
          <Link to={`/project/${project.id}`}>
            <img
              src={project.imgUrl}
              alt="ProjPic"
              className="profile-project-pic"
            />
          </Link>
          <div>
            <Link to={`/project/update/${project.id}`}><button>Edit</button></Link>
            <button onClick={() => this.deleteProject(project.id)}>Delete</button>
          </div>
        </Carousel.Item>
      )
    })
  }

  render() {
    const { name, username, email, linkedin } = this.state
    return (
      <div className="pro-proj-container">
        <div className="prof-header">
        <Link to={`/users/edit/${this.props.match.params.id}`}>Edit User</Link>
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
    
        </div>
        <Carousel className="user-project-list">
          {this.renderProjects()}
        </Carousel>
      </div>
    )
  }
}

export default Dashboard
