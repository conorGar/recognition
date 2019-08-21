import React from 'react'
import './HomepageHeader.css'
import Searchbar from '../SearchBar'
import CornerMenu from '../CornerMenu'
import FadingIconPic from '../FadingIconPic/'
import Card from '../Card'
import IntegrationDownshift from '../Autocomplete'
import { apiCall } from '../../App'

class HomepageHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      names: []
    }
  }

  componentDidMount() {
    this.getSearchData()
  }

  getSearchData = async () => {
    const response = await apiCall.get('/users')
    const names = response.data.map(element => {
      const label = element.name
      const obj = { label }
      return obj
    })
    this.setState({
      names: names
    })
  }

  handleFilterChange = event => {
    event.preventDefault()
    const filterValue = event.target.value

    this.setState({
      value: filterValue
    })

    this.props.search(this.state.value)
  }

  render() {
    const { names } = this.state
    // console.log(names)
    return (
      <div className="header-container">
        <div className="background">
          <div id="triangle-back" />
          <div className="search-container">
            <h1>Where Projects Speak For Themselves.</h1>
            <Searchbar handleChange={this.handleFilterChange} />
            <IntegrationDownshift names={this.state.names} />
          </div>
          <div className="rightside-container">
            <CornerMenu />

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

