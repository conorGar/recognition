import React from 'react';
import './HomepageHeader.css';
import Searchbar from '../SearchBar/Searchbar'
import CornerMenu from '../CornerMenu/CornerMenu'
import FadingIconPic from '../FadingIconPic/FadingIconPic'

class HomepageHeader extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            value: ''
        }
    }




    handleFilterChange = (event) =>{
        event.preventDefault();
        const filterValue = event.target.value;

        this.setState({
            value: filterValue
        })

        this.props.search(this.state.value)
   
    }

    render(){
        return (
            <div className= 'header-container'>

                <div className="background">
                    <div id="triangle-back"></div>
                    <div className="search-container">
                        <h1>Let Your Projects Speak For Themselves.</h1>
                        <Searchbar  handleChange={this.handleFilterChange}/>
                    </div>
                    <div className="corner-triangle">
                    <FadingIconPic />
                    
                    </div>
                   
                </div>
                {/* <CornerMenu /> */}

            </div>
        )
    }
}

export default HomepageHeader;