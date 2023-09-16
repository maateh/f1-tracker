import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// context
import useFilterContext from "../context/hooks/useFilterContext"

// models
import FilterModel from "../../../model/filter/Filter"
import FilterSelectorModel from "../../../model/filter/FilterSelector"
import QueryError from "../../../model/error/QueryError"

const useDriversFilterQuery = ({ onChange, additionalOption }) => {
  const { setDrivers } = useFilterContext()
  const { year, round, driverId } = useParams()

  return useQuery({
		queryKey: ['filter', 'driverList', year, round],
		queryFn: () => FilterModel.queryDrivers({ year, round })
      .then(filter => setDrivers({
        drivers: new FilterSelectorModel({
          filter: additionalOption ? filter.addOption(additionalOption) : filter,
          param: driverId,
          searchable: true,
          onChange,
          enabled: () => true
        })
      }))
      .catch(err => {
        throw new QueryError(err.message)
      })
	})
}

export default useDriversFilterQuery
