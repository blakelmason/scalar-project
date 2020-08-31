import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from './store'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Admin from './pages/Admin'
import Movie from './pages/Movie'

function App() {
  const getMovies = store((state) => state.getMovies)

  useEffect(() => {
    getMovies()
  }, [getMovies])

  return (
    <Router>
      <Navbar />
      <div className="container pb-5">
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/movie/:_id">
            <Movie />
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
