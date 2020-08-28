import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
