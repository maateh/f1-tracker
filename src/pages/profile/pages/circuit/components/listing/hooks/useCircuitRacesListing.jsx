import { useErrorBoundary } from 'react-error-boundary'

// components
import CircuitRaceCard from '../components/card/CircuitRaceCard'

// context
import useProfileContext from '../../../../../context/hooks/useProfileContext'

// models
import CardsModel from '../../../../../../../model/listing/Cards'

const useCircuitRacesListing = () => {
  const { showBoundary } = useErrorBoundary()
  const { weekends: {
    data: weekends, isLoading, isError, error
  }} = useProfileContext()

  if (isError) showBoundary(error)
  if (isLoading || !weekends) {
    return {
      cards: null,
      isLoading
    }
  }

  const cardsLayouts = weekends.map(weekend => (
    <CircuitRaceCard
      key={weekend.date}
      weekend={weekend}
    />
  ))

  return {
    cards: new CardsModel({
      styles: CardsModel.GRID_STYLES,
      layouts: cardsLayouts
    }),
    isLoading
  }

  // if (cards) {
  //   updateCardsLayouts({
  //     layouts: pageParam === 0 ? cardsLayouts : [...cards.layouts, ...cardsLayouts]
  //   })
  // } else {
  //   setCards({
  //     cards: new CardsModel({
  //       styles: CardsModel.GRID_STYLES,
  //       layouts: cardsLayouts
  //     })
  //   })
  // }
}

export default useCircuitRacesListing
