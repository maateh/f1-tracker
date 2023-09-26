// styles
import './StatisticsHolder.css'

const StatisticsHolder = ({ children }) => {
  return (
    <section className="stats-holder__container">
      {children}
    </section>
  )
}

export default StatisticsHolder
