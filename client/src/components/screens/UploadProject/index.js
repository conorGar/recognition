import React from 'react'

import './UploadProject.css'

class UploadProject extends React.Component{
    constructor(props){
        super(props);


        this.state = {
            name: '',
            description: '',
            skills: ''
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
                <h1>Upload New Project</h1>

                <div className="form-container">

                    <div className="upload-image-container">
                        <h2>Drag Image Here</h2>
                    </div>
                    <form className="project-submit-form">

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
                            <input
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
                                name='description'
                                onChange={this.handleTextInput}
                                value={this.state.skills}
                                />
                        </div>
                        <button>Submit</button>

                    </form>
                  
                </div>
            </div>
        )
    }
}


export default UploadProject;