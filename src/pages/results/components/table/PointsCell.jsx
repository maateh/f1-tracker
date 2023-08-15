const PointsCell = ({ points, scorers }) => {
  return (
    <>
      <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>
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
