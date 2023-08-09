// components
import ScheduleContent from "./content/ScheduleContent";

// context
import { ScheduleContextProvider } from "./context/ScheduleContext";

const SchedulePage = () => {
  return (
    <main className="page__container">
      <h1 className="page__title">Season Schedule</h1>

      <ScheduleContextProvider>
        <ScheduleContent />
      </ScheduleContextProvider>
    </main>
  )
}
export default SchedulePage
