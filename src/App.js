import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from './store'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'

function App() {
  const getMovies = store((state) => state.getMovies)

  useEffect(() => {
    getMovies()
  }, [getMovies])

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
