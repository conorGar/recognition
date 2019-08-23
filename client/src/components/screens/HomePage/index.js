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
      usernames: [],
      searchResult: '',
      returnSearchResult: false
    }
  }

  componentDidMount = async () => {
    await this.fetchUserData()
    await this.fetchProjectData()
    // await this.fetchProjectIncludesUserData()
  }

  fetchUserData = async () => {
    const userData = await apiCall.get('/users')
    const usernames = userData.data.map(element => element.username)
    this.setState(prevState => ({
      usernames: usernames
    }))
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

  // fetchProjectIncludesUserData = async () => {
  //   // const id = this.state.displayedProjects.length -1
  //   const userData = await apiCall.get(`/users/`)
  //   console.log(userData.data)
  //   const projectsArr = await userData.data.map(element => element.projects)
  //   // const projects = await projectsArr.map(element=>element)
  //   console.log(projectsArr)
  //   const usersProjects = await projectsArr.map((element,index) => element[index])
  //   console.log(usersProjects)
  //   // const usersProjects = projectsArr.map(element => element)
  //   // console.log(usersProjects)
  //   // this.setState(prevState => ({
  //   //   usernames: usernames
  //   // }))
  // }

  search = filterValue => {
    const filteredProjects = this.state.displayedProjects.filter(project =>
      project.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    )
    this.setState({
      searchResult: filteredProjects,
      returnSearchResult: true
    })
  }

  // Map through all the projects in the database and pass down needed data to the project icons
  createIcons = () => {
    const { displayedProjects } = this.state

    if (displayedProjects.length) {
      //if there are projects in the array...
      return displayedProjects.map(project => {
        return (
          <GeneralCard
            key={project.id}
            title={project.name}
            image={project.imgUrl}
            link={`/project/${project.id}`}
          />
        )
      })
    }
  }

  renderSearchResult = () => {
    const { searchResult } = this.state
    if (searchResult.length) {
      //if there are projects in the array...
      return searchResult.map(project => {
        return (
          <GeneralCard
            key={project.id}
            title={project.name}
            image={project.imgUrl}
            link={`/project/${project.id}`}
          />
        )
      })
    }
  }

  render() {
    const { returnSearchResult } = this.state
    // console.log(this.state.displayedProjects)
    // console.log(this.state.usernames)
    return (
      <div className="body">
        <Container classname="homepage-container">
          <div className="icons-container" />
        </Container>
        <div>
          <HomepageHeader
            search={this.search}
            loginHandler={this.clickLoginOpen}
          />
        </div>
        {returnSearchResult === true ? (
          <div className="icons-container">{this.renderSearchResult()}</div>
        ) : (
          <div className="icons-container">{this.createIcons()}</div>
        )}
      </div>
    )
  }
}

export default HomePage
