import React from 'react';
import './HomepageHeader.css';
import Searchbar from '../SearchBar/Searchbar'

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
                    <Searchbar  handleChange={this.handleFilterChange}/>
                </div>
            </div>
        )
    }
}

export default HomepageHeader;