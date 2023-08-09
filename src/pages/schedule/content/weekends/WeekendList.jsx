import { useLoaderData } from "react-router-dom"
import { useQuery } from "react-query"

// components
import WeekendCard from "./weekend/WeekendCard"
import SkeletonGrid from "../../../../components/skeleton/SkeletonGrid"
import Error from "../../../../components/error/Error"

// styles
import './WeekendList.css'

const WeekendList = () => {
  const { queryKey, queryFn } = useLoaderData()
  const { isLoading, isError, error, data } = useQuery({
    queryKey, 
    queryFn
  })

  return (
    <div className="weekend-list__container">
      {isLoading && <SkeletonGrid counter={9} />}
      {isError && <Error error={error} />}

      {!isLoading && !isError && data && (
        <>
          <h2 className="season-year">{data.year}</h2>
          
          <div className="weekend-list">
            {data.weekends.map(weekend => <WeekendCard key={weekend.round} weekend={weekend} />)}
          </div>
        </>
      )}
    </div>
  )
}

export default WeekendList
