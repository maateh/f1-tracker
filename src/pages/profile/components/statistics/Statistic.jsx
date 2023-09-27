// styles
import './Statistic.css'

const Statistic = ({ label, data, icon }) => {
  return (
    <div className="stat-data__wrapper icon__container dark">
      <p className="stat-label icon__container">
        {icon}
        <span className="stat-label">{label}</span>
      </p>
      <span className="stat-data">{data}</span>
    </div>
  )
}

export default Statistic
