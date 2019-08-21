import React from 'react'
import './HomepageHeader.css'
import Searchbar from '../SearchBar/Searchbar'
import CornerMenu from '../CornerMenu/CornerMenu'
import FadingIconPic from '../FadingIconPic/FadingIconPic'
import Card from '../Card'

class HomepageHeader extends React.Component {
  constructor(props) {
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


    handleLoginOpen = () =>{
        this.props.loginHandler();
    }


    render(){
        return (
            <div className= 'header-container'>

                <div className="background">
                    <div id="triangle-back"></div>
                    <div className="search-container">
                        <h1>Where Projects Speak For Themselves.</h1>
                        <Searchbar  handleChange={this.handleFilterChange}/>
                    </div>
                    <div className="rightside-container">
                        <CornerMenu loginHandler={this.handleLoginOpen}/>

                        <div className="corner-icon">
                        <FadingIconPic />
                        </div>

                    </div>
                   
                </div>

            </div>
        )
    }
  }

//   handleFilterChange = event => {
//     event.preventDefault()
//     const filterValue = event.target.value

//     this.setState({
//       value: filterValue
//     })

//     this.props.search(this.state.value)
//   }

//   render() {
//     return (
//       <div className="header-container">
//         <div className="background">
//           <CornerMenu />
//           <div className="search-container">
//             <h2>Let Your Projects Speak For Themselves.</h2>
//             <Searchbar handleChange={this.handleFilterChange} />
//           </div>
//           <div className="image-fader" />
//           <div className="corner-triangle" />
//         </div>
//       </div>
//     )
//   }
// }

export default HomepageHeader
