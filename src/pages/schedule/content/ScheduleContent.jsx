import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// components
import ScheduleFilter from './filter/ScheduleFilter'

// context
import { ScheduleFilterContextProvider } from './filter/context/ScheduleFilterContext'

// models
import WeekendModel from '../../../model/season/weekend/Weekend'

// icons
import { CircularProgress } from '@mui/material'

// styles
import './ScheduleContent.css'

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

          <h2 className="schedule-title">{year}</h2>
        </>
      )}

      {isError && <p className="error__element">{error.message}</p>}

      <Outlet />
    </div>
  )
}

export default ScheduleContent


// versenyhétvégék felsorolása, kiemelve a jelenlegi aktuálisat
// wiki link csatolása a pályákhoz
// szabadedzések, kvali, verseny időpontjai feltüntetve local idő szerint