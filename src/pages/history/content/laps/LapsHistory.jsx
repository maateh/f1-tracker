import { Outlet } from "react-router-dom"
import Select from 'react-select'

const LapsHistory = () => {
  return (
    <div>
      <Select />

      <Outlet />
    </div>
  )
}

export default LapsHistory