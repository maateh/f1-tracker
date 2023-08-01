import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// components
import LapsFilter from "./filter/LapsFilter"

// context
import { LapsFilterContextProvider } from "./filter/context/LapsFilterContext"

// models
import WeekendModel from "../../../../model/season/weekend/Weekend"
import FilterOptionModel from "../../../../model/filter/FilterOption"

// icons
import CircularProgress from '@mui/material/CircularProgress'

const LapsHistory = () => {
  const { year, round } = useParams()
  const navigate = useNavigate()

	const { isLoading, isError, error } = useQuery({
		queryKey: ['lastRound'],
		queryFn: WeekendModel.queryLast,
		onSuccess: ({ year, round }) => {
      const route = `./${year}/${round}/${FilterOptionModel.ALL.value}`
      navigate(route, { replace: true })
    },
		enabled: !year && !round,
	})

  return (
    <div className="history__container">
      {isLoading && <CircularProgress />}
      
      {year && round && (
        <LapsFilterContextProvider>
          <LapsFilter />
        </LapsFilterContextProvider>
      )}

      {isError && <p className="error__element">{error.message}</p>}

      <Outlet />
    </div>
  )
}

export default LapsHistory
