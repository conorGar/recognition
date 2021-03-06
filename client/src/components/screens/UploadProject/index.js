import React from 'react'
import { apiCall } from '../../../services/apiService'
import S3FileUpload from 'react-s3';
import { AwsConfig } from '../../../services/AwsConfig'

import './UploadProject.css'

class UploadProject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            skills: '',
            imgUrl: '',
            link: '',
            username: ''
        }
    }
    handleImageUpload = async (evt) => {
        await S3FileUpload.uploadFile(evt.target.files[0], AwsConfig)
            .then((data) => {
                this.setState({
                    imgUrl: data.location
                })
                console.log("Upload success at:" + data.location);
            }).catch((err) => {
                alert(err);
            })
    }

    handleProjectSubmit = async (e) => {
        e.preventDefault();
        const { name, description, skills, username, imgUrl, link } = this.state
        const id = this.props.match.params.id;
        console.log("Handle project submit activate")
        try {
            await apiCall.post(`project/create/user/${id}`, { name, description, skills, imgUrl, username, link })
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

    render() {
        return (
            <div className="upload-project-container">
                <h1>Upload New Project</h1>
                <div className="form-container">
                    <form className="project-submit-form" onSubmit={this.handleProjectSubmit}>
                        <div className="upload-image-container">
                            <h2>Drag Image Here</h2>
                            <input
                                name="uploadedImage"
                                type="file"
                                onChange={this.handleImageUpload}
                            />
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
                            <div className="input-container">
                                <label htmlFor='link'>Link</label>
                                <input
                                    type='text'
                                    name='link'
                                    onChange={this.handleTextInput}
                                    value={this.state.link}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor='skills'>Skills Used</label>
                                <input
                                    type='text'
                                    name='skills'
                                    onChange={this.handleTextInput}
                                    value={this.state.skills}
                                    placeholder="Example: HTML, CSS, etc."
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor='username'>Other Users</label>
                                <input
                                    type='text'
                                    name='username'
                                    onChange={this.handleTextInput}
                                    value={this.state.username}
                                    placeholder="Example: dgrosh123, jkim3360, etc."
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

export default UploadProject;