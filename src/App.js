import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './features/header/components/Header'
import Search from './features/search/components/Search'
import Movies from './features/grid/components/Movies'
import Shows from './features/grid/components/Shows'
import SingleMovie from './features/grid/components/SingleMovie'
import SingleShow from './features/grid/components/SingleShow'
import Error from './features/error/components/Error'

import './App.css'

const App = () => {
  return(
    <div className="app">
      <Header />
      <Switch>
        <Route exact path={["/", "/movies"]}>
          <Search />
          <Movies />
        </Route>
        <Route exact path="/shows">
          <Search />
          <Shows />
        </Route>
        <Route exact path="/movie/:id">
          <SingleMovie />
        </Route>
        <Route exact path="/show/:id">
          <SingleShow />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </div>
  )
}

export default App