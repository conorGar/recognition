import React from 'react'
import './Project.css'
import home3 from './images/home3.jpg'
import { apiCall } from '../../../App'


class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: ''
        };
      }

    componentDidMount = () => {
          this.getName()       
    }

    getName = async () => {
        // let id = this.props.match.params.id
        let projectid = await apiCall.get(`/project/1`)
        this.setState({title: projectid.data.name})
    }
    
    render() {
        // console.log(this.state.title) 
        const { title } = this.state
        return (
            <div id="project-container">
                <h1 className="project-title">{title}</h1>
                <img src={home3} alt="ProjPic" className="project-pic"/>
                <p className="project-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu porttitor ligula. Integer vel ex porta, lobortis ligula quis, tristique odio. Vivamus ultricies sapien eu fringilla volutpat. Aliquam ullamcorper leo erat. Ut vitae mauris sit amet ipsum tempus tincidunt eget non ex. Vestibulum vitae urna non libero varius dictum mollis ac turpis. Maecenas rhoncus quis purus non volutpat. In mollis velit ac lectus gravida, vel porttitor metus viverra. Fusce blandit nisi magna, vel congue ex fermentum et. Nullam pretium nulla tristique nunc gravida, quis tincidunt libero rutrum. Nam id tincidunt tellus. Quisque vehicula ullamcorper ultricies. Duis orci mi, tincidunt quis pretium eget, ultricies semper urna. Suspendisse et erat vitae risus egestas ullamcorper quis nec est. Curabitur ut lectus nec purus molestie commodo vitae ac arcu. Quisque quis nisl risus.</p>
                <div className='contribute'>
                    <h3>Contributors</h3>
                    <h5>Justin Lendle - LinkedIn</h5>
                </div>
            </div>
        )
    }
}

export default Project;