import React from 'react'
import './App.css'
import { Route, Link } from 'react-router-dom'
import HomePage from './components/screens/HomePage'
import Project from './components/screens/Project'
import SignUpForm from './components/screens/SignUpForm'
import LoginForm from './components/screens/LoginForm'
import Axios from 'axios'
import HideAppBar from './components/HideAppBar'

export const apiCall = Axios.create({ baseURL: 'http://localhost:8001' })

export default function App() {
  return (
    <div className="App">
      <HideAppBar />
      <main>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/project/:id" component={Project} />
        <Route path="/user/signup" component={SignUpForm} />
        <Route path="/user/login" component={LoginForm} />
      </main>
    </div>
  )
}
