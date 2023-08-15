const PointsCell = ({ points, scorers }) => {
  return (
    <>
      <p style={{ fontWeight: '600', fontSize: '1.2rem' }}>
        {points} points
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
