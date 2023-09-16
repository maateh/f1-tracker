import { useParams } from "react-router-dom"
import { useInfiniteQuery } from "react-query"

// api
import { constructorList, constructorListFromSeason } from "../../../../../../../api/constructors/constructorList"

// components
import ConstructorCard from "../components/card/ConstructorCard"

// context
import useListingContext from "../../../../../../../components/listing/context/hooks/useListingContext"

// models
import SeasonModel from "../../../../../../../model/season/Season"
import TitleModel from "../../../../../../../model/listing/Title"
import CardsModel from "../../../../../../../model/listing/Cards"
import PaginationModel from "../../../../../../../model/listing/Pagination"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"
import QueryError from "../../../../../../../model/error/QueryError"

const useConstructorsQuery = () => {
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
      .then(({ info, data }) => {
        if (!data.Constructors || !data.Constructors.length) {
          throw new QueryError('No data found!', 404)
        }

        const constructors = SeasonModel.parseConstructors({
          Constructors: data.Constructors,
        })
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
            layouts: [...cards.layouts, ...cardsLayouts]
          })
        } else {
          setCards({
            cards: new CardsModel({
              styles: {
                margin: '2rem 4rem',
                display: 'grid',
                gap: '4rem'
              },
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
      .catch(err => {
        throw new QueryError(err.message)
      })
  })
}

export default useConstructorsQuery
