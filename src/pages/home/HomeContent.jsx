import { useQuery } from "react-query"

// api
import { nextRound } from "../../api/season/round/nextRound"

// components
import RelevantWeekend from "./components/weekend/RelevantWeekend"
import RelevantSession from "./components/session/RelevantSession"
import CardsSkeleton from "../../components/skeletons/listing/cards/CardsSkeleton"

// context
import { useWeekendContext } from "./context/hooks/useWeekendContext"

// styles
import './Home.css'

const HomeContent = () => {
  const { weekend, dispatch } = useWeekendContext()
  useQuery({
    queryKey: ['nextRound'],
    queryFn: () => nextRound()
      .then(({ weekend }) => {
        dispatch({ type: 'SET', payload: weekend })
      })
  })

  return (
    <div className="home-content">
      {weekend ? (
        <>
          <RelevantWeekend />
          <RelevantSession />
        </>
      ) : (
        // TODO
        // This is temporarily.
        // Should be to create custom skeletons for the home page.
        <CardsSkeleton counter={2} />
      )}
    </div>
  )
}

export default HomeContent
