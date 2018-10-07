let locationId = 0
export const addLocation = (action) => ({
  type: 'ADD_LOCATION',
  id: locationId++,
  name: action.name,
  lat: action.lat,
  lng: action.lng
})
export const deleteLocation = (action) => ({
  type: 'DELETE_LOCATION',
  id: action.id,
  name: action.name
})
