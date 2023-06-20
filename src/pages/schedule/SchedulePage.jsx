// components
import ScheduleContent from "./content/ScheduleContent";

// context
import { ScheduleContextProvider } from "./context/ScheduleContext";

// styles
import './SchedulePage.css'

const SchedulePage = () => {
  return (
    <main className="schedule-page__container">
      <h1 className="page__title">Season Schedule</h1>

      <ScheduleContextProvider>
        <ScheduleContent />
      </ScheduleContextProvider>
    </main>
  )
}
export default SchedulePage
