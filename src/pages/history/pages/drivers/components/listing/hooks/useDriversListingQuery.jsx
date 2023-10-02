import { useParams } from "react-router-dom"
import { useInfiniteQuery } from "react-query"

// api
import { driverList, driverListFromSeason } from "../../../../../../../api/drivers/driverList"

// components
import DriverCard from "../components/card/DriverCard"

// context
import useListingContext from "../../../../../../../components/listing/context/hooks/useListingContext"

// models
import TitleModel from "../../../../../../../model/listing/Title"
import CardsModel from "../../../../../../../model/listing/Cards"
import PaginationModel from "../../../../../../../model/listing/Pagination"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"
const useDriversListingQuery = () => {
  const { cards, setTitle, setCards, updateCardsLayouts } = useListingContext()
  const { year } = useParams()

  const call = pageParam => year === FilterOptionModel.ALL.value 
    ? driverList({ offset: pageParam * 30, limit: 30 })
    : driverListFromSeason(year, { offset: pageParam * 30, limit: 30 })

  return useInfiniteQuery({
    queryKey: ['listing', 'driverList', year],
    getNextPageParam: ({ currentPage, pageQuantity }) => {
      return currentPage < pageQuantity - 1
        ? currentPage + 1
        : undefined
    },
    queryFn: ({ pageParam = 0 }) => call(pageParam)
      .then(({ info, drivers }) => {
        const cardsLayouts = drivers.map(driver => (
          <DriverCard
            key={driver.id}
            driver={driver}
          />
        ))

        setTitle({
          title: new TitleModel({
            main: `Formula 1 Drivers History (${year === FilterOptionModel.ALL.value ? 'since 1950' : `in ${year}`})`
          })
        })
        
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

export default useDriversListingQuery
