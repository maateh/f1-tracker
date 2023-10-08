import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useErrorBoundary } from "react-error-boundary"

// context
import useFilterContext from "../context/hooks/useFilterContext"

// models
import FilterModel from "../../../model/filter/Filter"
import FilterSelectorModel from "../../../model/filter/FilterSelector"

const useDriversFilterQuery = ({ onChange, additionalOption }) => {
  const { showBoundary } = useErrorBoundary()
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
      })),
    onError: () => showBoundary()
	})
}

export default useDriversFilterQuery
