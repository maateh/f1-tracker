const DriverSeasonCard = ({ standings }) => {
  return (
    <li className="driver-season-card__container">
      <h3>{standings.year}</h3>
      <h4>{standings.round}</h4>
    </li>
  )
}

export default DriverSeasonCard
