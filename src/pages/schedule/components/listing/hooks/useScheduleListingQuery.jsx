import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { season } from "../../../../../api/season/season"
import { nextRound } from "../../../../../api/season/round/nextRound"

// components
import WeekendCard from '../components/card/WeekendCard'

// context
import useListingContext from '../../../../../components/listing/context/hooks/useListingContext'

// models
import CardsModel from "../../../../../model/listing/Cards"

const useScheduleListingQuery = () => {
  const { showBoundary } = useErrorBoundary()
  const { setCards } = useListingContext()
  const { year } = useParams()

  return useQuery({
    queryKey: ['listing', 'season', year],
    queryFn: () => Promise.all([
      season(year),
      nextRound()
    ])
      .then(([{ season }, { weekend: nextWeekend }]) => {
        setCards({
          cards: new CardsModel({
            styles: CardsModel.GRID_STYLES,
            layouts: season.weekends.map(weekend => (
              <WeekendCard
                key={weekend.round}
                weekend={weekend}
                nextWeekend={nextWeekend}
              />
            ))
          })
        })
      }),
    onError: err => showBoundary(err)
  })
}

export default useScheduleListingQuery
