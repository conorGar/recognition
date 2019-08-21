import React from 'react';

import './CornerMenu.css'

class CornerMenu extends React.Component{
    constructor(props){
        super(props)
    }

    loginClick = (e) =>{
        e.preventDefault();
        console.log("login click happened")
        this.props.loginHandler();
    }

    render(){
        return(
            <div className="corner-menu-container">
                <div className='login-container'>
                    <div className="login-button" onClick={this.loginClick}>LOGIN</div>
                </div>
            </div>
        )
    }
}

export default CornerMenu