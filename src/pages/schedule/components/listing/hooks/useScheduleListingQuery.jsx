import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { season } from "../../../../../api/season/season"

// components
import WeekendCard from '../components/card/WeekendCard'

// context
import useListingContext from '../../../../../components/listing/context/hooks/useListingContext'

// models
import SeasonModel from "../../../../../model/season/Season"
import WeekendModel from "../../../../../model/season/weekend/Weekend"
import CardsModel from "../../../../../model/listing/Cards"
import QueryError from "../../../../../model/error/QueryError"

const useScheduleListingQuery = () => {
  const { setCards } = useListingContext()
  const { year } = useParams()

  return useQuery({
    queryKey: ['listing', 'season', year],
    queryFn: () => Promise.all([
      season(year),
      WeekendModel.queryNext()
    ])
      .then(([{ data }, nextWeekend]) => {
        const weekends = SeasonModel.parseWeekends({ Races: data.Races })
        
        setCards({
          cards: new CardsModel({
            styles: {
              margin: '2rem 4rem',
              display: 'grid',
              gap: '4rem'
            },
            layouts: weekends.map(weekend => (
              <WeekendCard
                key={weekend.round}
                weekend={weekend}
                nextWeekend={nextWeekend}
              />
            ))
          })
        })
      })
      .catch(err => {
        throw new QueryError(err.message)
      })
  })
}

export default useScheduleListingQuery
