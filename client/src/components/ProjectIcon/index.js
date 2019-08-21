import React from 'react';
import './ProjectIcon.css'


class ProjectIcon extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="icon-container">
                <h1 className="project-title">{this.props.projectTitle}</h1>
            </div>
        )
    }
}

export default ProjectIcon;