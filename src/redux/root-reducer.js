import { combineReducers } from "redux"
import moviesReducer from "./reducers/movies-reducer"
import searchReducer from "./reducers/search-reducer"
import settingsReducer from "./reducers/settings-reducer"
import showsReducer from "./reducers/shows-reducer"

const rootReducer = combineReducers({
  movies: moviesReducer,
  search: searchReducer,
  settings: settingsReducer,
  shows: showsReducer
})

export default rootReducer