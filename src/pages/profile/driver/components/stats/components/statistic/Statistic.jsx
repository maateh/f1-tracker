const Statistic = ({ label, data, icon }) => {
  return (
    <div className="driver-stat-data__wrapper icon__container dark">
      <p className="driver-stat-label icon__container">
        {icon}
        <span className="driver-stat-label">{label}</span>
      </p>
      <span className="driver-stat-data">{data}</span>
    </div>
  )
}

export default Statistic
