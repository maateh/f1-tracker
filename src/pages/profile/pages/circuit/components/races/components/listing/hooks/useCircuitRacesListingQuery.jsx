import { useParams } from 'react-router-dom'
import { useInfiniteQuery } from 'react-query'

// api
import { circuitRaces } from '../../../../../../../../../api/circuits/races/circuitRaces'

// components
import CircuitRaceCard from '../components/card/CircuitRaceCard'

// context
import useListingContext from '../../../../../../../../../components/listing/context/hooks/useListingContext'

// models
import CardsModel from '../../../../../../../../../model/listing/Cards'
import PaginationModel from '../../../../../../../../../model/listing/Pagination'

const useCircuitRacesListingQuery = () => {
  const { cards, setCards, updateCardsLayouts } = useListingContext()
  const { id } = useParams()

  return useInfiniteQuery({
    queryKey: ['circuitRaces', id],
    getNextPageParam: ({ currentPage, pageQuantity }) => {
      return currentPage < pageQuantity - 1
        ? currentPage + 1
        : undefined
    },
    queryFn: ({ pageParam = 0 }) => circuitRaces(id, { offset: pageParam * 30, limit: 30 })
      .then(({ info, weekends }) => {
        const cardsLayouts = weekends.map(weekend => (
          <CircuitRaceCard
            key={weekend.date}
            weekend={weekend}
          />
        ))

        if (cards) {
          updateCardsLayouts({
            layouts: pageParam === 0 ? cardsLayouts : [...cards.layouts, ...cardsLayouts]
          })
        } else {
          setCards({
            cards: new CardsModel({
              styles: CardsModel.GRID_STYLES,
              layouts: cardsLayouts
            })
          })
        }

        return new PaginationModel({
          total: info.total,
          limit: info.limit,
          pageQuantity: Math.ceil(info.total / info.limit),
          currentPage: pageParam
        })
      })
  })
}

export default useCircuitRacesListingQuery
