const PointsCell = ({ points, scorers }) => {
  return (
    <>
      <p style={{ fontWeight: '600', fontSize: '1.2rem' }}>
        {points} <span style={{ fontWeight: '400' }}>points</span>
      </p>

      {scorers && (
        <p style={{ fontWeight: '300', fontSize: '0.9rem' }}>
          {scorers}
        </p>
      )}
    </>
  )
}

export default PointsCell
