import { useEffect } from "react"
import axios from "axios"

const baseUrl = 'https://ergast.com/api/f1'
const suffixUrl = '.json'

export const useFetchWithDispatch = (dispatch, url, key, query = '', method = "GET") => {
  useEffect(() => {
    const controller = new AbortController()
    
    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' })
      
      axios({
        method, 
        url: `${baseUrl}${url}${suffixUrl}${query}`, 
        signal: controller.signal
      }).then((res) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: res.data.MRData[key] })
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            dispatch({ type: 'FETCH_ERROR', payload: 'Could not fetch the data' })
            return
          }
          console.error('the fetch was aborted')
        })
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [dispatch, url, key, method, query])
}