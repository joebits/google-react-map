let locationId = 0
export const addLocation = (action) => ({
  type: 'ADD_LOCATION',
  id: locationId++,
  name: action.name,
  latLng: action.latLng,
})
export const deleteLocation = (action) => ({
  type: 'DELETE_LOCATION',
  id: action.id,
  name: action.name
})

export const showLocation = (action) => ({
  type: 'SHOW_LOCATION',
  id: action.id
})
