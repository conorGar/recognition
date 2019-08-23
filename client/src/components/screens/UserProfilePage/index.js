import React from 'react'
import { apiCall } from '../../../services/apiService'
import './UserProfilePage.css'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'

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
        user: { name, username, email, linkedin, projects }
      }
    } = response
    this.setState({
      name,
      username,
      email,
      linkedin,
      projects
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
        <div className="prof-header">
          <h1 className="prof-name">{name}</h1>
          <h2 className="prof-username">{username}</h2>
          <h3 className="prof-email">{email}</h3>
          <a href={`${linkedin}`}>
            <h3 className="prof-linkedin">
              Linked
              <span>
                <i class="fa fa-linkedin"></i>
              </span>
            </h3>
          </a>
        </div>
        <Carousel className="user-project-list">
          {this.renderProjects()}
        </Carousel>
      </div>
    )
  }
}

export default UserProfilePage
