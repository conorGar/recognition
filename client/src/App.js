import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom'
import HomePage from './components/screens/HomePage/HomePage'
import Project from './components/screens/Project/Project'
import SignUpForm from './components/screens/SignUpForm'
import Axios from 'axios'

export const apiCall = Axios.create({ baseURL: "http://localhost:8001" })


export default function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Homepage</Link>
        <Link to="/project/2">Project</Link>
        <Link to="/user/signup">Sign Up</Link>

      </nav>
      <main>
        <Route
          exact path="/"
          component={HomePage}
        />
        <Route
          exact path="/project/:id"
          component={Project}
        />
        <Route 
          path="/user/signup"
          component={SignUpForm}
        />
      </main>
    </div>
      );
    }
    
    
