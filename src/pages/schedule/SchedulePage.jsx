// components
import Content from "./content/Content";

// context
import { ScheduleContextProvider } from "./context/ScheduleContext";

// styles
import './SchedulePage.css'

const SchedulePage = () => {
  return (
    <main className="schedule-page__container">
      <h1 className="page__title">Season Schedule</h1>

      <ScheduleContextProvider>
        <Content />
      </ScheduleContextProvider>
    </main>
  )
}
export default SchedulePage
