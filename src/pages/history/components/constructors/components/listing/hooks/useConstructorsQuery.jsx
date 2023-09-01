import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

const useConstructorsQuery = () => {
  const { constructorId } = useParams()

  return useQuery({
    queryKey: ['listing', 'constructors'],
    queryFn: () => {}
  })
}

export default useConstructorsQuery
