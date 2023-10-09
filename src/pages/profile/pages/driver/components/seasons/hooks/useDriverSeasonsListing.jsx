import { useErrorBoundary } from 'react-error-boundary'

// components
import DriverSeasonCard from '../components/listing/components/card/DriverSeasonCard'

// context
import useDriverProfileContext from '../../../context/hooks/useDriverProfileContext'

// models
import TitleModel from '../../../../../../../model/listing/Title'
import CardsModel from '../../../../../../../model/listing/Cards'

const LISTING_TITLE = new TitleModel({
  main: "Driver's Participated Seasons"
})

const useDriverSeasonsListing = () => {
  const { showBoundary } = useErrorBoundary()
  const { standingsList: {
    data: standingsList, isLoading, isError, error
  }} = useDriverProfileContext()

  if (isError) showBoundary(error)
  if (isLoading || !standingsList) {
    return {
      title: LISTING_TITLE,
      cards: null,
      isLoading
    }
  }
  
  const cardsLayouts = standingsList.map(standings => (
    <DriverSeasonCard
      key={standings.year}
      standings={standings}
    />
  ))

  return {
    title: LISTING_TITLE,
    cards: new CardsModel({
      styles: CardsModel.GRID_STYLES,
      layouts: cardsLayouts
    })
  }
}

export default useDriverSeasonsListing
