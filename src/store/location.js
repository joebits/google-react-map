const locations = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LOCATION':
      return Object.assign({}, state, {
        locations: [...state.locations, {
          id: action.id,
          name: action.name,
          latLng: action.latLng,
        }]
      });
    case 'DELETE_LOCATION':
      return state.locations.splice(state.findIndex(i => i.id === action.id), 1);
    case 'SHOW_LOCATION':
      return Object.assign({}, state, {
        showLocation: state.locations.find(l => l.id === action.id)
      });
    default:
      return state
  }
}

export default locations