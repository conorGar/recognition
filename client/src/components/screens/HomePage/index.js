import React from 'react'
import HomepageHeader from '../../HomepageHeader'
import { apiCall } from '../../../services/apiService'
import GeneralCard from '../../Card'
import Container from '../../Container'
import './HomePage.css'

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayedProjects: [],
      projectImages: null,
      usernames: [],
      searchProjectResult: '',
      returnSearchResult: false,
      searchSkill: [],
      searchSkillResult: []
    }
  }

  componentDidMount = async () => {
    await this.fetchUserData()
    await this.fetchProjectData()
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
    const images = projects.data.map(project => {
      return project.imgUrl
    })
    const skills = projects.data.map(project => {
      return project.skills
    })
    this.setState({
      displayedProjects: projects.data,
      projectImages: images,
      skills: skills
    })
  }

  search = async filterValue => {
    const filteredProjects = await this.state.displayedProjects.filter(
      project =>
        project.name
          .toLocaleLowerCase()
          .includes(filterValue.toLocaleLowerCase()) ||
        project.skills
          .toLocaleLowerCase()
          .includes(filterValue.toLocaleLowerCase())
    )
    const username = await this.state.usernames.filter(username =>
      username.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    )
    const skill = await this.state.skills.filter(skill =>
      skill.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    )
    this.setState({
      searchProjectResult: filteredProjects,
      searchUsername: username,
      searchSkill: skill,
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
            description={project.description}

          />
        )
      })
    }
  }

  renderSearchResult = () => {
    const { searchProjectResult } = this.state
    console.log(searchProjectResult)
    if (searchProjectResult.length) {
      //if there are projects in the array...
      return searchProjectResult.map(project => {
        return (
          <GeneralCard
            key={project.id}
            title={project.name}
            image={project.imgUrl}
            link={`/project/${project.id}`}
            description={project.description}

          />
        )
      })
    }
  }

  setSearchSkillResult = async () => {
    console.log('button works')
    const { displayedProjects, searchSkill, searchSkillResult } = this.state
    if (searchSkill.length) {
      const project = await displayedProjects.filter(project => {
        if (searchSkill[0] === project.skills) return project
      })
      // console.log(project)
      await this.setState({
        searchSkillResult: project,
        searchSkillIsTrue: true
      })
    }
    console.log(this.state.searchSkillResult, this.state.searchSkillIsTrue)
  }

  renderSearchSkill = () => {
    const { searchSkillResult } = this.state
    console.log(searchSkillResult)
    searchSkillResult.map(project => {
      return (
        <GeneralCard
          key={project.id}
          title={project.name}
          image={project.imgUrl}
          link={`/project/${project.id}`}
          description={project.description}
        />
      )
    })
  }

  render() {
    const {
      returnSearchResult,

      searchSkillIsTrue
    } = this.state
    console.log(this.state.displayedProjects)
    console.log(this.state.searchSkill)

    return (
      <div className="body">
       
        <div>
          <HomepageHeader
            search={this.search}
            loginHandler={this.clickLoginOpen}
            username={this.state.searchUsername}
            fetchUserData={this.fetchUserData}
            fetchProjectData={this.fetchProjectData}
            setSearchSkillResult={this.setSearchSkillResult}
          />
        </div>
        {/* <Container classname="homepage-container">
          <div className="icons-container" />
        </Container> */}

        {searchSkillIsTrue === true ? (
          <div className="icons-container">{this.renderSearchSkill()}</div>
        ) : (
          ''
        )}

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
