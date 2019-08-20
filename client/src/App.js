import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom'
import  HomePage  from './components/screens/HomePage/HomePage'
import  Project  from './components/screens/Project/Project'
import Axios from 'axios'

export const apiCall = Axios.create({ baseURL: "http://localhost:8001" })


export default function App() {
  return (
    <div className="App">
      <nav>
      <Link to="/">Homepage</Link>
      <Link to="/project/2">Project</Link>
      </nav>
      <main>
        <Route 
            exact path="/home" 
            component={HomePage}
            />
        <Route 
            exact path="/project/:id" 
            component={Project}
            />
      </main>
    </div>
  );
}


