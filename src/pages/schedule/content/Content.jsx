import { useEffect } from 'react'

// components
import SeasonSelector from './selector/SeasonSelector'
import WeekendList from './weekends/WeekendList'
import LoadingScheduleContent from './loading/LoadingScheduleContent'
import Error from '../../error/Error'

// context
import { useScheduleContext } from '../context/hooks/useScheduleContext'

// model
import SeasonModel from '../../../model/season/Season'

const Content = () => {
  const { schedule, year, loading, error, dispatch } = useScheduleContext()
  
  useEffect(() => {
    dispatch({ type: 'FETCH_SCHEDULE_START' })
    SeasonModel.fetch(`/${year}`)
    .then(data => dispatch({ type: 'FETCH_SCHEDULE_SUCCESS', payload: data }))
    .catch(err => dispatch({ type: 'FETCH_SCHEDULE_ERROR', payload: err.message }))
  }, [year, dispatch])

  return (
    <div className="schedule-content">
      {loading && !schedule && <LoadingScheduleContent />}
      {error && <Error error={error} />}

      {schedule && (
        <>
          <SeasonSelector />
          <WeekendList />
        </>
      )}
    </div>
  )
}

export default Content


// versenyhétvégék felsorolása, kiemelve a jelenlegi aktuálisat
// wiki link csatolása a pályákhoz
// szabadedzések, kvali, verseny időpontjai feltüntetve local idő szerint