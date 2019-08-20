import React from 'react';
import HomepageHeader from '../../common/HomepageHeader/HomepageHeader';
import Axios from 'axios';
import {Link} from 'react-router-dom'
import { async } from 'q';
import ProjectIcon from '../../common/ProjectIcon/ProjectIcon';
import {apiCall} from '../../../App'

import './HomePage.css'

class HomePage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            projects: [
                {name:"blah", skills:"bloo"},
                {name:"blah 2", skills:"broo"}
            ],
            displayedProjects: []
            
        }
    }


    componentDidMount = async () => {
        const allProjects = await apiCall.get('/project');

        console.log(allProjects);

        this.setState({projects: allProjects.data})

        this.setState({
            displayedProjects: this.state.projects
        })

       


       

    }

    //Activated in HompageHeader.js everytime something is typed into search bar
    search = async (filterValue) => {
             this.setState((prevState, props) => {
             const filteredProjects = this.state.projects.filter(project =>
                project.skills.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()));
            
    
                return{
                    displayedProjects:filteredProjects,
                }
        })
    }

    // Map through all the projects in the database and pass down needed data to the project icons 
    createIcons =  () => {
        const {displayedProjects} = this.state
        console.log("PROJECTS:" +displayedProjects)
         if(displayedProjects.length){ //if there are projects in the array...
             return  displayedProjects.map((project) => {
                 return <Link key={project.id} to={`/projects/${project.id}`}><ProjectIcon projectTitle={project.name}/></Link>
             })

         }  

    }

    render() {

        return (
            <div>
                <HomepageHeader search={this.search}/>
                <div className="icons-container">
                    {this.createIcons()}
                </div>
            </div>
        )
    }
}

export default HomePage;