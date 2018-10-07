const locations = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LOCATION':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          lat: action.lat,
          lng: action.lng
        }
      ]
    case 'DELETE_LOCATION':
      return state.splice(state.findIndex(i => i.id === action.id), 1);
    default:
      return state
  }
}

export default locations