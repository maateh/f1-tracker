const ConstructorSeasonCard = ({ standings }) => {
  return (
    <li className="constructor-season-card__container">
      <h3>{standings.year}</h3>
      <h4>{standings.round}</h4>
    </li>
  )
}

export default ConstructorSeasonCard
