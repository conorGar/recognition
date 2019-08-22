import React from 'react'
import HomepageHeader from '../../HomepageHeader'
import { apiCall } from '../../../services/apiService'
import { Link } from 'react-router-dom'
import { async } from 'q'
import ProjectIcon from '../../ProjectIcon'
import GeneralCard from '../../Card'
import Container from '../../Container'

import './HomePage.css'
import LoginForm from '../LoginForm'

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayedProjects: [],
      projectImages: null,
      showLoginForm: 'loginform-hide'
    }
  }

  componentDidMount = async () => {
    await this.fetchUserData()
    await this.fetchProjectData()
  }

  fetchUserData = async () => {
    await apiCall.get('/users').then(res => {
      // console.log(res.data)
    })
  }

  fetchProjectData = async () => {
    const projects = await apiCall.get('/project')
    const images = projects.data.map(element => {
      return element.imgUrl
    })
    this.setState({
      displayedProjects: projects.data,
      projectImages: images
    })
  }

  search = async filterValue => {
    this.setState((prevState, props) => {
      const filteredProjects = this.state.projects.filter(project =>
        project.skills
          .toLocaleLowerCase()
          .includes(filterValue.toLocaleLowerCase())
      )

      return {
        displayedProjects: filteredProjects
      }
    })
  }

  // Map through all the projects in the database and pass down needed data to the project icons
  createIcons = () => {
    const { displayedProjects } = this.state
    // console.log('PROJECTS:' + displayedProjects)
    if (displayedProjects.length) {
      //if there are projects in the array...
      return displayedProjects.map(project => {
        return (
          <GeneralCard key={project.id}
            title={project.name}
            image={project.imgUrl}
            link={`/project/${project.id}`}
          />
        )
      })
    }
  }

  clickLoginOpen = () => {
    if(this.state.showLoginForm === 'loginform-hide'){
        this.setState({
            showLoginForm: 'loginform-show'
        })
    }
  }

  handleSuccessfulLogin = () => { //closes the login form if the user has logged in successfully
    if(this.state.showLoginForm === 'loginform-show'){
        this.props.handleLogin();
        // this.setState({
        //     showLoginForm: 'loginform-hide'
        // })
    }
  }


  render() {
    const {isSignedIn} = this.props
    return (
<<<<<<< HEAD
      <div>
        <HomepageHeader search={this.search} loginHandler={this.clickLoginOpen}/>
        <div className="icons-container">{this.createIcons()}</div>

        {/* <Card link="/project/2" /> */}

        <LoginForm currentClass={this.state.showLoginForm} loginCloseHandle={this.handleSuccessfulLogin}/>
=======
      <div className="body">
        <Container classname="homepage-container">
          <div className="icons-container" />
        </Container>
        <div>
          <HomepageHeader
            search={this.search}
            loginHandler={this.clickLoginOpen}
          />

          {/* <LoginForm
            currentClass={this.state.showLoginForm}
            loginCloseHandle={this.handleSuccessfulLogin}
          /> */}
        </div>
    <div className="icons-container">{this.createIcons()}</div>
>>>>>>> 46b3036441a07532d27f31add079f4d9e25bb780
      </div>
    )
  }
}

export default HomePage
