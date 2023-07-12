import { useQuery } from 'react-query'

// components
import SeasonSelector from './selector/SeasonSelector'
import WeekendList from './weekends/WeekendList'
import SkeletonGrid from '../../../components/skeleton/SkeletonGrid'
import Error from '../../error/Error'

// context
import { useScheduleContext } from '../context/hooks/useScheduleContext'

// model
import SeasonModel from '../../../model/season/Season'

const ScheduleContent = () => {
  const { schedule, year, dispatch } = useScheduleContext()
  const scheduleQuery = useQuery({
    queryKey: ['season', year],
    queryFn: () => SeasonModel.query(year),
    onSuccess: data => dispatch({ type: 'SET_SCHEDULE', payload: data })
  })

  return (
    <div className="schedule-content">
      {scheduleQuery.isLoading && <SkeletonGrid counter={9} />}
      {scheduleQuery.isError && <Error error={scheduleQuery.error} />}

      {schedule && (
        <>
          <SeasonSelector />
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