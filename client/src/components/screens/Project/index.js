import React from 'react'
import './Project.css'
import { apiCall } from '../../../services/apiService'
import { Link } from 'react-router-dom'

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            image: null,
            description: '',
            skills: '',
            users: [],
            checked: localStorage.getItem("theme") === "dark" ? true : false,
            theme: localStorage.getItem("theme")
        };
      }
    componentDidMount = () => {
          this.getName()
          document 
            .getElementsByTagName("HTML")[0]
            .setAttribute("data-theme", localStorage.getItem("theme"));      
    }

    toggleThemeChange = () => {
        const { checked } = this.state;
        if (checked === false) {
          localStorage.setItem("theme", "dark");
          document
            .getElementsByTagName("HTML")[0]
            .setAttribute("data-theme", localStorage.getItem("theme"));
          this.setState({
            checked: true
          });
        } else {
          localStorage.setItem("theme", "light");
          document
            .getElementsByTagName("HTML")[0]
            .setAttribute("data-theme", localStorage.getItem("theme"));
          this.setState({
            checked: false
          });
        }
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
        const { title, image, description, users, skills, checked } = this.state
        const skillz = skills.split(' ')
        return (
            <div id="page-container">
                {/* <div className="header">
                    {checked ? (
                        <h1 className="project-title">{title}</h1>
                    ) : (
                        <h1 className="project-title2">{title}</h1>
                    )}    
                    <div className="switch-container">
                        {checked ? (<p className="night-mode">Night Mode</p>):(<p className="night-mode2">Night Mode</p>)}
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                defaultChecked={this.state.checked}
                                onChange={() => this.toggleThemeChange()}
                            />
                            <span className="slider round" />
                        </label>
                    </div>
                </div> */}
                <div className="proj-holder">
                  
                    {checked ? (
                        <div className="proj-left">
                            
                            <img src={image} alt="ProjPic" className="project-pic"/>
                            <ul className='skill-list'>
                                {skillz.map(skill => {
                                    return (
                                        <li key={skill} className='list-item'>{skill}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    ) : (
                        <div className="proj-left2">
                            <h1 className="project-title2">{title}</h1>
                            <img src={image} alt="ProjPic" className="project-pic"/>
                            <div className='skill-list-container'>
                                <h3>Skills</h3>
                                {skillz.map(skill => {
                                    return (
                                        <div key={skill} className='list-item'>{skill}</div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    <div className="middy"/>
                    { checked ? (
                        <div className="proj-right">
                            <div className="proj-desc">
                                <h3>Description</h3>
                                <p>{description}</p>
                            </div>
                            <div className='contribute'>
                                <h3>Contributors</h3>
                                {users.map(user => {
                                    return (
                                        <Link key ={user} to={`/user/${user.id}`}>
                                            <h5 className='user-cred'>{user.name}</h5>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ):(
                        <div className="proj-right2">
                            <div className="proj-desc">
                                <h3>Description</h3>
                                <p>{description}</p>
                            </div>
                            <div className='contribute'>
                                <h3>Contributors</h3>
                                {users.map(user => {
                                    return (
                                        <Link key={user} to={`/user/${user.id}`}>
                                            <h5 className='user-cred'>{user.name}</h5>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    <div className="switch-container">
                        {checked ? (<p className="night-mode">Night Mode</p>):(<p className="night-mode2">Night Mode</p>)}
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                defaultChecked={this.state.checked}
                                onChange={() => this.toggleThemeChange()}
                            />
                            <span className="slider round" />
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}
export default Project