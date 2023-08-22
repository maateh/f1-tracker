import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"

// components
import LapsFilter from "./components/filter/LapsFilter"

// context
import { LapsFilterContextProvider } from "./components/filter/context/LapsFilterContext"

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
    <section className="history-category__container">
      {isLoading && <CircularProgress />}
      
      {year && round && (
        <LapsFilterContextProvider>
          <LapsFilter />
        </LapsFilterContextProvider>
      )}

      {isError && <p className="error__element">{error.message}</p>}

      <Outlet />
    </section>
  )
}

export default LapsHistory
