import { useParams } from "react-router-dom"
import { useInfiniteQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// api
import { constructorList, constructorListFromSeason } from "../../../../../../../api/constructors/constructorList"

// components
import ConstructorCard from "../components/card/ConstructorCard"

// context
import useListingContext from "../../../../../../../components/listing/context/hooks/useListingContext"

// models
import TitleModel from "../../../../../../../model/listing/Title"
import CardsModel from "../../../../../../../model/listing/Cards"
import PaginationModel from "../../../../../../../model/listing/Pagination"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"

const useConstructorsListingQuery = () => {
  const { showBoundary } = useErrorBoundary()
  const { cards, setTitle, setCards, updateCardsLayouts } = useListingContext()
  const { year } = useParams()

  const call = pageParam => year === FilterOptionModel.ALL.value 
    ? constructorList({ offset: pageParam * 30, limit: 30 })
    : constructorListFromSeason(year, { offset: pageParam * 30, limit: 30 })

  return useInfiniteQuery({
    queryKey: ['listing', 'constructorList', year],
    getNextPageParam: ({ currentPage, pageQuantity }) => {
      return currentPage < pageQuantity - 1
        ? currentPage + 1
        : undefined
    },
    queryFn: ({ pageParam = 0 }) => call(pageParam)
      .then(({ info, constructors }) => {        
        const cardsLayouts = constructors.map(constructor => (
          <ConstructorCard
            key={constructor.id}
            constructor={constructor}
          />
        ))

        setTitle({
          title: new TitleModel({
            main: `Formula 1 Constructors History (${year === FilterOptionModel.ALL.value ? 'since 1950' : `in ${year}`})`
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
      }),
    onError: err => showBoundary(err)
  })
}

export default useConstructorsListingQuery
