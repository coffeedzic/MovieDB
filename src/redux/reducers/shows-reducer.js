export const setTopShows = shows => ({
  type: 'SHOWS.SET_TOP_SHOWS', 
  payload: shows
})

export const setSearchShows = shows => ({
  type: 'SHOWS.SET_SEARCH_SHOWS', 
  payload: shows
})

const initialState = {
  topShows: [],
  searchShows: []
}

const showsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SHOWS.SET_TOP_SHOWS':
      return {
        ...state,
        topShows: action.payload
      }
    case 'SHOWS.SET_SEARCH_SHOWS':
      return {
        ...state,
        searchShows: action.payload
      }
    default:
      return state
  }
}

export default showsReducer