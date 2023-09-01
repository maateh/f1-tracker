import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

const useDriversQuery = () => {
  const { driverId } = useParams()

  return useQuery({
    queryKey: ['listing', 'drivers'],
    queryFn: () => {}
  })
}

export default useDriversQuery
