// api
import { season } from '../../../../api/season'

// components
import WeekendCard from '../../content/card/WeekendCard'

// models
import SeasonModel from '../../../../model/season/Season'
import ListingModel from '../../../../model/listing/Listing'
import ListingCardsModel from '../../../../model/listing/ListingCards'
import QueryError from '../../../../model/error/QueryError'

export const getScheduleQuery = ({ year }) => ({
	queryKey: ['listing', 'season', year],
	queryFn: () => season(year)
    .then(({ data }) => {
      const season = new SeasonModel(data)

      return new ListingModel({
        cards: new ListingCardsModel({
          styles: {
            margin: '2rem 4rem',
            display: 'grid',
            gap: '5rem'
          },
          layouts: season.weekends.map(weekend => (
            <WeekendCard key={weekend.round} weekend={weekend} />
          ))
        })
      })
    })
    .catch(err => {
      throw new QueryError(err.message)
    })
})
