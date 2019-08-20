import React from 'react'
import './Project.css'
import { apiCall } from '../../../App'

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      image: null,
      description: '',
      users: []
    }
  }

  componentDidMount = () => {
    this.getName()
  }

  getName = async () => {
    let id = this.props.match.params.id
    let projectid = await apiCall.get(`/project/${id}`)
    this.setState({
      title: projectid.data.name,
      image: projectid.data.imgUrl,
      description: projectid.data.description,
      users: projectid.data.users
    })
    // console.log()
  }

  render() {
    console.log(this.state.users)
    const { title, image, description, users } = this.state
    return (
      <div id="project-container">
        <h1 className="project-title">{title}</h1>
        <img src={image} alt="ProjPic" className="project-pic" />
        <p className="project-desc">{description}</p>
        <div className="contribute">
          <h3>Contributors</h3>
          {users.map(user => {
            return (
              <div key={user.id}>
                <h5>
                  <span>
                    {user.name}
                    <span> - </span>
                    {user.linkedin}
                  </span>
                </h5>
                {/* <h5>{user.linkedin}</h5> */}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Project
