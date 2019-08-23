import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Slide from '@material-ui/core/Slide'
import './HideAppBar.css'
import MaterialButton from '@material-ui/core/Button'

function HideOnScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
}

class HideAppBar extends React.Component {
  constructor(props){
    super(props)

  }


  handleLoginClick = (e) =>{
    e.preventDefault();
    console.log(this.props);
    this.props.updatePopupStatus();
  }

  render(){
    return (
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...this.props}>
          <AppBar
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              background: '#333333',
              height: `${60}px`
            }}
          >
            <Toolbar
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            >
              <Link to="/" className="links">
                <MaterialButton variant="contained" style={{ margin: `${20}px` }}>
                  Homepage
                </MaterialButton>
              </Link>

              {!this.props.isSignedIn && (
                <Link to="/user/login" className="links">
                  <MaterialButton onClick={this.handleLoginClick}
                    variant="contained"
                    style={{ margin: `${20}px` }
                    }
                  >
                    Login
                  </MaterialButton>
                  {/* <div className="links" onClick={this.handleLoginClick}>
                    Login
                  </div> */}
                </Link>
              )}

              {this.props.isSignedIn && (
                <Link
                  to={`/dashboard/${localStorage.getItem('userId')}`}
                  className="links"
                >
                  <MaterialButton
                    variant="contained"
                    style={{ margin: `${20}px` }}
                  >
                    Profile
                  </MaterialButton>
                </Link>
              )}

              {this.props.isSignedIn && (
                <MaterialButton
                  onClick={this.props.signOutUser}
                  variant="contained"
                  style={{ margin: `${20}px` }}
                >
                  Sign Out
                </MaterialButton>
              )}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
      </React.Fragment>
    )
  }
}


export default HideAppBar;