import { Outlet } from "react-router-dom"

// components
import HistoryChooser from "./chooser/HistoryChooser"

const HistoryContent = () => {
  return (
    <div className="history-content">
      <HistoryChooser />
      <Outlet />
    </div>
  )
}

export default HistoryContent