import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// api
import { circuitRaces } from '../../../../../../api/circuits/races/circuitRaces'

// components
import CircuitRaceCard from '../components/card/CircuitRaceCard'

// context
import useCircuitProfileContext from '../../../context/hooks/useCircuitProfileContext'
import { SET_RACES_CARDS } from '../../../context/CircuitProfileContextActions'

// models
import SeasonModel from '../../../../../../model/season/Season'
import CardsModel from '../../../../../../model/listing/Cards'
import QueryError from '../../../../../../model/error/QueryError'

const useCircuitRacesQuery = () => {
  const { dispatch } = useCircuitProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['circuitRaces', id],
    queryFn: () => circuitRaces(id)
      .then(({ data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }

        const weekends = SeasonModel.parseWeekends({ Races: data.Races })
        dispatch({
          type: SET_RACES_CARDS,
          payload: new CardsModel({
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
          })
        })
      })
      .catch(err => {
        throw new QueryError(err.message)
      })
  })
}

export default useCircuitRacesQuery
