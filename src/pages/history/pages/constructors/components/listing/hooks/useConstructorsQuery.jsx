import { useParams } from "react-router-dom"
import { useInfiniteQuery } from "react-query"

// api
import { constructorList, constructorListFromSeason } from "../../../../../../../api/constructors/constructorList"

// components
import ConstructorCard from "../components/card/ConstructorCard"

// models
import SeasonModel from "../../../../../../../model/season/Season"
import ListingModel from "../../../../../../../model/listing/Listing"
import TitleModel from "../../../../../../../model/listing/Title"
import CardsModel from "../../../../../../../model/listing/Cards"
import PaginationModel from "../../../../../../../model/listing/Pagination"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"
import QueryError from "../../../../../../../model/error/QueryError"

const useConstructorsQuery = () => {
  const { year } = useParams()

  const call = pageParam => year === FilterOptionModel.ALL.value 
    ? constructorList({ offset: pageParam * 30, limit: 30 })
    : constructorListFromSeason(year, { offset: pageParam * 30, limit: 30 })

  return useInfiniteQuery({
    queryKey: ['listing', 'constructorList', year],
    getNextPageParam: ({ pagination }) => {
      return pagination.currentPage < pagination.pageQuantity - 1
        ? pagination.currentPage + 1
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

        return new ListingModel({
          title: new TitleModel({
            main: `Formula 1 Constructors History (${year === FilterOptionModel.ALL.value ? 'since 1950' : `in ${year}`})`
          }),
          cards: new CardsModel({
            styles: {
              margin: '2rem 4rem',
              display: 'grid',
              gap: '4rem'
            },
            layouts: constructors.map(constructor => (
              <ConstructorCard
                key={constructor.id}
                constructor={constructor}
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
      .catch(err => {
        throw new QueryError(err.message)
      })
  })
}

export default useConstructorsQuery
