import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// components
import ScheduleFilter from './components/filter/ScheduleFilter'
import LoadingHandler from '../../components/loading/LoadingHandler'

// context
import { ScheduleFilterContextProvider } from './components/filter/context/ScheduleFilterContext'

// models
import WeekendModel from '../../model/season/weekend/Weekend'


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
      {year && (
        <>
          <ScheduleFilterContextProvider>
            <ScheduleFilter />
          </ScheduleFilterContextProvider>
        </>
      )}

      <LoadingHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
      />

      <Outlet />
    </div>
  )
}

export default ScheduleContent
