import { useEffect, useState } from "react"
import axios from "axios"

const prefixUrl = 'https://ergast.com/api/f1'
const suffixUrl = '.json'

export const useFetch = (url, key, query = '', method = "GET") => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    
    const fetchData = async () => {
      setIsPending(true)
      
      axios({
        method, 
        url: `${prefixUrl}${url}${suffixUrl}${query}`, 
        signal: controller.signal
      }).then((res) => {
          setData(res.data.MRData[key])
          setError(null)
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setError('Could not fetch the data')
            return
          }
          console.error('the fetch was aborted')
        })
        .finally(() => {
          setIsPending(false)
        })
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url, key, method, query])
  return { data, isPending, error }
}