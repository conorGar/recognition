import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom'
import  HomePage  from './components/screens/HomePage/HomePage'
import  Project  from './components/screens/Project/Project'

function App() {
  return (
    <div className="App">
      <nav>
      <Link to="/">Homepage</Link>
      <Link to="/project">Project</Link>
      </nav>
      <main>
        <Route 
            exact path="/home" 
            component={HomePage}
            />
        <Route 
            exact path="/project" 
            component={Project}
            />
      </main>
    </div>
  );
}

export default App;
