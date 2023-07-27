import { useQuery } from 'react-query'

// components
import ScheduleFilter from './filter/ScheduleFilter'
import WeekendList from './weekends/WeekendList'
import SkeletonGrid from '../../../components/skeleton/SkeletonGrid'
import Error from '../../../components/error/Error'

// context
import { useScheduleContext } from '../context/hooks/useScheduleContext'

// model
import SeasonModel from '../../../model/season/Season'

const ScheduleContent = () => {
  const { schedule, year, dispatch } = useScheduleContext()
  const { isLoading, isError, error } = useQuery({
    queryKey: ['season', year],
    queryFn: () => SeasonModel.query(year),
    onSuccess: data => dispatch({ type: 'SET_SCHEDULE', payload: data })
  })

  return (
    <div className="schedule-content">
      {isLoading && <SkeletonGrid counter={9} />}
      {isError && <Error error={error} />}

      {schedule && (
        <>
          <ScheduleFilter />
          <WeekendList />
        </>
      )}
    </div>
  )
}

export default ScheduleContent


// versenyhétvégék felsorolása, kiemelve a jelenlegi aktuálisat
// wiki link csatolása a pályákhoz
// szabadedzések, kvali, verseny időpontjai feltüntetve local idő szerint