import React from 'react';
import { apiCall } from '../../../services/apiService'
import './UserProfilePage.css'

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    this.fetchUserInfo()
  }

  fetchUserInfo = async () => {
    const response = await apiCall.get(`/users/${this.props.match.params.id}`)
    const { data: { user: { name, username, email, linkedin, projects } } } = response
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
    return projects.map(project => {
      return (
        <div key={project.id} className='user-project'>
          <h3>{project.name}</h3>
          <img src={project.imgUrl} alt="ProjPic" className="project-pic" />
        </div>
      )
    })
  }

  render() {
    const { name, username, email, linkedin } = this.state
    return (
      <div>
        <h1>{name}</h1>
        <h2>{username}</h2>
        <h3>{email}</h3>
        <h3>{linkedin}</h3>
        <div className='user-project-list'>
          {this.renderProjects()}
        </div>
      </div>
    );
  }
}

export default UserProfilePage;