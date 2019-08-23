import React from 'react';
import './Searchbar.css';


const Searchbar = (props) =>{

        return(
            <div className="searchbar-container">
                <input type="text" value={props.value} onChange={props.handleChange} placeholder={props.placeholder} name="search-bar"></input>
            </div>
        )
    
}

export default Searchbar;