import { Outlet } from "react-router-dom"

// components
import HistorySelector from "./selector/HistorySelector"

const HistoryContent = () => {
  return (
    <div className="history-content">
      <HistorySelector />
      <Outlet />
    </div>
  )
}

export default HistoryContent