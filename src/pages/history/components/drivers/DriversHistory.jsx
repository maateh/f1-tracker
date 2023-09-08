import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

// context
import { DriversFilterContextProvider } from './components/filter/context/DriversFilterContext'

// components
import DriversFilter from './components/filter/DriversFilter'

// models
import FilterOptionModel from '../../../../model/filter/FilterOption'

const DriversHistory = () => {
  const { year } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!year) navigate(`./${FilterOptionModel.ALL.value}`, { replace: true })
  }, [year, navigate])

  return (
    <div className="drivers-history">
      {year && (
        <>
          <DriversFilterContextProvider>
            <DriversFilter />
          </DriversFilterContextProvider>
        </>
      )}

      <Outlet />
    </div>
  )
}

export default DriversHistory
