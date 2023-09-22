// components
import ConstructorSeasonCard from '../components/listing/components/card/ConstructorSeasonCard'

// context
import useConstructorProfileContext from '../../../context/hooks/useConstructorProfileContext'

// models
import TitleModel from '../../../../../../model/listing/Title'
import CardsModel from '../../../../../../model/listing/Cards'

const useConstructorSeasonsListing = () => {
  const { standings: standingsLists } = useConstructorProfileContext()

  if (!standingsLists) return { cards: null }
  
  const cardsLayouts = standingsLists.map(standings => (
    <ConstructorSeasonCard
      key={standings.year}
      standings={standings}
    />
  ))

  return {
    title: new TitleModel({
      main: "Constructor's participated seasons"
    }),
    cards: new CardsModel({
      styles: CardsModel.GRID_STYLES,
      layouts: cardsLayouts
    })
  }
}

export default useConstructorSeasonsListing
