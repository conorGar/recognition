import React from 'react'
import './HomepageHeader.css'
import Searchbar from '../SearchBar'
import CornerMenu from '../CornerMenu'
import FadingIconPic from '../FadingIconPic/'
import Card from '../Card'
import IntegrationDownshift from '../Autocomplete'
import { apiCall } from '../../services/apiService'
<<<<<<< HEAD
=======
import Autocomplete from '../Autocomplete'
import Container from '../Container'
>>>>>>> 46b3036441a07532d27f31add079f4d9e25bb780

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

  handleLoginOpen = () =>{
    this.props.loginHandler();
}


  render() {
    const { names } = this.state
    // console.log(names)
    return (
      <Container className="body">
        <div className="background">
          {/* <CornerMenu /> */}
          <div className="search-container">
            <h2>Let Your Projects Speak For Themselves.</h2>
            <Searchbar handleChange={this.handleFilterChange} />
<<<<<<< HEAD
            <IntegrationDownshift names={this.state.names} />
          </div>
          <div className="rightside-container">
            <CornerMenu loginHandler={this.handleLoginOpen}/>

            <div className="corner-icon">
              <FadingIconPic />
            </div>
=======
            <Autocomplete />
>>>>>>> 46b3036441a07532d27f31add079f4d9e25bb780
          </div>
          <div className="image-fader" />
          <div className="corner-triangle" />
        </div>
      </Container>
    )
  }
}



export default HomepageHeader
