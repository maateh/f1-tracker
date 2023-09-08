import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

// context
import { ConstructorsFilterContextProvider } from './components/filter/context/ConstructorsFilterContext'

// components
import ConstructorsFilter from './components/filter/ConstructorsFilter'

// models
import FilterOptionModel from '../../../../model/filter/FilterOption'

const ConstructorsHistory = () => {
  const { year } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!year) navigate(`./${FilterOptionModel.ALL.value}`, { replace: true })
  }, [year, navigate])

  return (
    <div className="constructors-history">
      {year && (
        <>
          <ConstructorsFilterContextProvider>
            <ConstructorsFilter />
          </ConstructorsFilterContextProvider>
        </>
      )}

      <Outlet />
    </div>
  )
}

export default ConstructorsHistory
