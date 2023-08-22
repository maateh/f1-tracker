import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// components
import ScheduleFilter from './components/filter/ScheduleFilter'

// context
import { ScheduleFilterContextProvider } from './components/filter/context/ScheduleFilterContext'

// models
import WeekendModel from '../../model/season/weekend/Weekend'

// icons
import CircularProgress from '@mui/material/CircularProgress'

const ScheduleContent = () => {
	const { year } = useParams()
	const navigate = useNavigate()

	const { isLoading, isError, error } = useQuery({
		queryKey: ['lastRound'],
		queryFn: WeekendModel.queryLast,
		onSuccess: ({ year }) =>
			navigate(`./${year}`, { replace: true }),
		enabled: !year,
	})

  return (
    <div className="schedule-content">
      {isLoading && <CircularProgress />}

      {year && (
        <>
          <ScheduleFilterContextProvider>
            <ScheduleFilter />
          </ScheduleFilterContextProvider>
        </>
      )}

      {isError && <p className="error__element">{error.message}</p>}

      <Outlet />
    </div>
  )
}

export default ScheduleContent
