import React from 'react'
import { apiCall } from '../../../services/apiService'
import S3FileUpload from 'react-s3';
import './EditPage.css'
const config = {
    bucketName: 'myBucket',
    dirName: 'photos', /* optional */
    region: 'eu-west-1',
    accessKeyId: 'ANEIFNENI4324N2NIEXAMPLE', //replace when have key
    secretAccessKey: 'cms21uMxçduyUxYjeg20+DEkgDxe6veFosBT7eUgEXAMPLE', //replace when have key
}


class EditProject extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            description: '',
            skills: '',
            imgUrl: 'randomgiberish',
            link: 'fff',
            username: 'jkim3360'

        }
    }


    //Fill the text forms with what is already in the project by default
  componentDidMount = async () => {
    let id = this.props.match.params.id
    const thisProj = await apiCall.get(`project/${id}`)
    console.log("component did mount: update Ice Cream" + thisProj);
    const {name, description, skills} = thisProj.data;
 


    this.setState({
      name: name,
      description: description,
      skills:skills
  })
  }
    


  handleImageUpload = async (evt) => {
    evt.preventDefault()

    S3FileUpload.uploadFile(evt.target.files[0], config)
    .then((data) => {
        console.log("Upload success at:" + data.location);
    }).catch((err) =>{
        alert(err);
    })
    // await this.props.history.push('/')
  }


  handleProjectSubmit = async (e) => {
    e.preventDefault();
    const { name, description, skills, username, imgUrl, link } = this.state
    const id = this.props.match.params.id;
    console.log("Handle project submit activate")
    try {
        await apiCall.put(`project/${id}`, { name, description, skills, imgUrl, username, link })
        await this.props.history.push('/')
    }
    catch (error) {
        throw error
    }
}


  handleTextInput = async (evt) => {
    const { name, value } = evt.target

    this.setState({
      [name]: value
    })
  }


    render(){
        return (
            <div className="upload-project-container">
                <h1>Edit Project</h1>

                <div className="form-container">

                    
                    <form className="project-submit-form" onSubmit={this.handleProjectSubmit}>
                        <div className="upload-image-container">
                             <h2>Drag Image Here</h2>
                             <input name="uploadedImage" type="file" onChange={this.handleImageUpload}></input>
                        </div>
                        <div className="text-info-container">
                            <div className="input-title-container">
                                <h2>Project Title:</h2>
                                <input
                                    type='text'
                                    name='name'
                                    onChange={this.handleTextInput}
                                    className="title-input-form"
                                    value={this.state.name}
                                    />
                            </div>
                            <div className="input-description-container">
                                <h2>Description:</h2>
                                <textarea
                                    type='text'
                                    name='description'
                                    className='description-input'
                                    onChange={this.handleTextInput}
                                    value={this.state.description}
                                    />
                            </div>
                            <div className="input-skills-container">
                                <label htmlFor='skills'>Skills Used</label>
                                <input
                                    type='text'
                                    name='skills'
                                    onChange={this.handleTextInput}
                                    value={this.state.skills}
                                    />
                            </div>
                        </div>
                        <button className="submit-button">Submit</button>

                    </form>
                  
                </div>
            </div>
        )
    }
}


export default EditProject;