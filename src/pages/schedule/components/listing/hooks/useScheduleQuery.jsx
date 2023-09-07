import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { season } from "../../../../../api/season/season"

// components
import ScheduleTitle from "../components/title/ScheduleTitle"
import WeekendCard from '../components/card/WeekendCard'

// models
import SeasonModel from "../../../../../model/season/Season"
import WeekendModel from "../../../../../model/season/weekend/Weekend"
import ListingModel from "../../../../../model/listing/Listing"
import ListingTitleModel from "../../../../../model/listing/ListingTitle"
import ListingCardsModel from "../../../../../model/listing/ListingCards"
import QueryError from "../../../../../model/error/QueryError"

const useScheduleQuery = () => {
  const { year } = useParams()

  return useQuery({
    queryKey: ['listing', 'season', year],
    queryFn: () => Promise.all([
      season(year),
      WeekendModel.queryNext()
    ])
      .then(([{ data }, nextWeekend]) => {
        const weekends = SeasonModel.parseWeekends({ Races: data.Races })
        
        return new ListingCardsModel({
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
      .catch(err => {
        throw new QueryError(err.message)
      })
  })
}

export default useScheduleQuery
