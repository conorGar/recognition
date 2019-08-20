import React from 'react';
import HomepageHeader from '../../common/HomepageHeader/HomepageHeader';
import Axios from 'axios';
import {Link} from 'react-router-dom'
import { async } from 'q';
import ProjectIcon from '../../common/ProjectIcon/ProjectIcon';


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

        // const allProjects = await Axios.get('/home');
        // console.log(allProjects);
        // this.setState({projects: allProjects.data})

        this.setState({
            displayedProjects: this.state.projects
        })

       

    }

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
                <h1>Home</h1>
                <HomepageHeader search={this.search}/>
                {this.createIcons()}
            </div>
        )
    }
}

export default HomePage;