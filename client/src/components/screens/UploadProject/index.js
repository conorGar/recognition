import React from 'react'


class UploadProject extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="upload-project-container">
                <form className="project-submit-form">
                    <div className="input-title-container">
                        <label htmlFor='name'>Project Titlte</label>
                        <input
                            type='text'
                            name='name'
                            onChange={this.handleTextInput}
                            value={this.state.name}
                            />
                    </div>
                    <div className="input-description-container">
                        <label htmlFor='description'>Project Titlte</label>
                        <input
                            type='text'
                            name='description'
                            onChange={this.handleTextInput}
                            value={this.state.description}
                            />
                    </div>
                    <div className="input-skills-container">
                        <label htmlFor='skills'>Project Titlte</label>
                        <input
                            type='text'
                            name='description'
                            onChange={this.handleTextInput}
                            value={this.state.description}
                            />
                    </div>
                    <button>Submit</button>

                </form>
            </div>
        )
    }
}


export default UploadProject;