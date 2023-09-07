const DriverCard = ({ driver, lastRef }) => {
  return (
    <li className="driver-card__container" ref={lastRef ? lastRef : undefined}>
      <h3 className="driver-name">{driver.fullName} {driver.formattedNumber}</h3>
      <p className="driver-date-of-birth">{driver.formattedDateOfBirth}</p>
      <p className="driver-nationality">{driver.nationality}</p>
    </li>
  )
}

export default DriverCard
