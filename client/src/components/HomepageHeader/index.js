import React from 'react'
import './HomepageHeader.css'
import Searchbar from '../SearchBar'
import CornerMenu from '../CornerMenu'
import FadingIconPic from '../FadingIconPic/'
import Card from '../Card'
import IntegrationDownshift from '../Autocomplete'
import { apiCall } from '../../services/apiService'
import Autocomplete from '../Autocomplete'
import Container from '../Container'
import MaterialButton from '@material-ui/core/Button'

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

  handleChange = event => {
    event.preventDefault()

    const filterValue = event.target.value
    this.setState({
      value: filterValue
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const value = event.target
    await this.props.fetchUserData()
    await this.props.fetchProjectData()
    await this.props.search(this.state.value)
    await this.props.setSearchSkillResult()
    // console.log(this.props.username, value)
  }

  render() {
    const { names } = this.state
    return (
      <Container className="body">
        <div className="background">
          {/* <CornerMenu /> */}
          <div className="search-container">
            <h2>Let Your Projects Speak For Themselves.</h2>
            <form onSubmit={this.handleSubmit}>
              <Searchbar placeholder='Search Project or Skill' handleChange={this.handleChange} />
              <MaterialButton
                onClick={this.handleSubmit}
                variant="contained"
                style={{ margin: `${20}px` }}
              >
                Search
              </MaterialButton>{' '}
            </form>
          </div>
          <div className="image-fader" />
          <div className="corner-triangle" />
        </div>
      </Container>
    )
  }
}

export default HomepageHeader
