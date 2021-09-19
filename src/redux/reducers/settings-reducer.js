export const setLoading = bool => ({
  type: 'SETTINGS.SET_LOADING',
  payload: bool 
})

const initialState = {
  loading: false,
}

const settingsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SETTINGS.SET_LOADING':
      return {
        loading: action.payload
      }
    default:
      return state
  }
}

export default settingsReducer