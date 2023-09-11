import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

// context
import { CircuitsFilterContextProvider } from './components/filter/context/CircuitsFilterContext'

// components
import CircuitsFilter from './components/filter/CircuitsFilter'

// models
import FilterOptionModel from '../../../../model/filter/FilterOption'

const CircuitsHistory = () => {
  const { year } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!year) navigate(`./${FilterOptionModel.ALL.value}`, { replace: true })
  }, [year, navigate])

  return (
    <div className="circuits-history">
      {year && (
        <>
          <CircuitsFilterContextProvider>
            <CircuitsFilter />
          </CircuitsFilterContextProvider>
        </>
      )}

      <Outlet />
    </div>
  )
}

export default CircuitsHistory
