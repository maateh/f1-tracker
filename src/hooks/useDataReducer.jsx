const INITIAL_DATA_STATE = {
  loading: false,
  error: null,
  data: null
}

const useDataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { loading: true, error: null, data: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: null, data: action.payload }
    case 'FETCH_ERROR':
      return { loading: false, error: action.payload, data: null }
    default:
      return state
  }
}

export { INITIAL_DATA_STATE, useDataReducer }