import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MaterialButton from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Slide from '@material-ui/core/Slide'
import './HideAppBar.css'


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


export default function HideAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          style={{
            justifyContent: 'space-between',
            background: '#333333'
          }}
        >
          <Toolbar
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
          >
            <MaterialButton variant="contained" style={{ margin: `${20}px` }}>
              <Link to="/" className="links">
                Homepage
              </Link>
            </MaterialButton>

            {!props.isSignedIn && (
              <MaterialButton variant="contained" style={{ margin: `${20}px` }}>
                <Link to="/user/login" className="links">
                  Login
                </Link>
              </MaterialButton>
            )}

            {props.isSignedIn && (
              <MaterialButton
                onClick={props.signOutUser}
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
