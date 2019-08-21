import React from 'react'
import HomepageHeader from '../../common/HomepageHeader/HomepageHeader'
import { apiCall } from '../../../App'
import { Link } from 'react-router-dom'
import { async } from 'q'
import ProjectIcon from '../../common/ProjectIcon/ProjectIcon'
import GeneralCard from '../../common/Card'

import './HomePage.css'

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayedProjects: [],
      projectImages: null
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
          <GeneralCard
            title={project.name}
            image={project.imgUrl}
            link={`/project/${project.id}`}
          />
        )
      })
    }
  }

  render() {
    //   console.log(this.state.displayedProjects)
    console.log(this.state.displayedProjects)
    // console.log(this.state.projectImages)
    console.log(this.state.projectImages)

    return (
      <div>
        <HomepageHeader search={this.search} />
        <div className="icons-container">{this.createIcons()}</div>

        {/* <Card link="/project/2" /> */}
      </div>
    )
  }
}

export default HomePage
