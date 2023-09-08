import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// components
import ConstructorsListing from "./components/listing/ConstructorsListing"

// models
import FilterOptionModel from '../../../../model/filter/FilterOption'

const ConstructorsHistory = () => {
  const { year } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!year) navigate(`./${FilterOptionModel.ALL.value}`, { replace: true })
  }, [year, navigate])

  return year && <ConstructorsListing />
}

export default ConstructorsHistory
