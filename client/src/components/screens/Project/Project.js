import React from 'react'
import './Project.css'
import { apiCall } from '../../../App'


class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            image: null,
            description: '',
            skills: '',
            users: []
        };
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
            users: projectid.data.users,
            skills: projectid.data.skills
        })
        console.log()
    }
    
    render() {
        const { title, image, description, users, skills } = this.state
        const skillz = skills.split(' ')
        return (
            <div id="project-container">
                <div className="proj-left">
                    <h1 className="project-title">{title}</h1>
                    <img src={image} alt="ProjPic" className="project-pic"/>
                    <p className="project-desc">{description}</p>
                </div>
                <div className="proj-right">
                    <div className ='skilly'>
                        <ul className='skill-list'>
                            {skillz.map(skill => {
                                return (
                                    <li key={skill} className='list-item'>{skill}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='contribute'>
                        <h3>Contributors</h3>
                        {users.map(user => {
                            return (
                                <div key = {user.id}>
                                    <h5 className='user-cred'><span>{user.name}<span> - </span><a href={user.linkedin}>{user.linkedin}</a></span></h5>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Project;