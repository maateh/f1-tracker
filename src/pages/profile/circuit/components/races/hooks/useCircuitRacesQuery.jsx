import { useParams } from 'react-router-dom'
import { useInfiniteQuery } from 'react-query'

// api
import { circuitRaces } from '../../../../../../api/circuits/races/circuitRaces'

// components
import CircuitRaceCard from '../components/card/CircuitRaceCard'

// context
import useCircuitProfileContext from '../../../context/hooks/useCircuitProfileContext'
import { SET_RACES_CARDS } from '../../../context/CircuitProfileContextActions'

// models
import SeasonModel from '../../../../../../model/season/Season'
import ListingModel from '../../../../../../model/listing/Listing'
import CardsModel from '../../../../../../model/listing/Cards'
import PaginationModel from '../../../../../../model/listing/Pagination'
import QueryError from '../../../../../../model/error/QueryError'

const useCircuitRacesQuery = () => {
  const { dispatch } = useCircuitProfileContext()
  const { id } = useParams()

  return useInfiniteQuery({
    queryKey: ['circuitRaces', id],
    getNextPageParam: ({ pagination }) => {
      return pagination.currentPage < pagination.pageQuantity - 1
        ? pagination.currentPage + 1
        : undefined
    },
    queryFn: ({ pageParam = 0 }) => circuitRaces(id, { offset: pageParam * 30, limit: 30 })
      .then(({ info, data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }

        const weekends = SeasonModel.parseWeekends({ Races: data.Races })
        dispatch({
          type: SET_RACES_CARDS,
          payload: new ListingModel({
            cards: new CardsModel({
              styles: {
                margin: '2rem 4rem',
                display: 'grid',
                gap: '4rem'
              },
              layouts: weekends.map(weekend => (
                <CircuitRaceCard
                  key={weekend.date}
                  weekend={weekend}
                />
              ))
            }),
            pagination: new PaginationModel({
              total: info.total,
              limit: info.limit,
              pageQuantity: Math.ceil(info.total / info.limit),
              currentPage: pageParam
            })
          })
        })
      })
      .catch(err => {
        throw new QueryError(err.message)
      })
  })
}

export default useCircuitRacesQuery
