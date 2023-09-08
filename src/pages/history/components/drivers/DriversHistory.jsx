import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// components
import DriversListing from './components/listing/DriversListing'

// models
import FilterOptionModel from '../../../../model/filter/FilterOption'

const DriversHistory = () => {
  const { year } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!year) navigate(`./${FilterOptionModel.ALL.value}`, { replace: true })
  }, [year, navigate])

  return year && <DriversListing />
}

export default DriversHistory
