const TimeCell = ({ time, gap }) => {
  return (
    <>
      <p style={{
        fontSize: '1.1rem',
        fontWeight: 500
      }}>
        {time}
      </p>


      <p style={{
        fontSize: '0.9rem',
        fontWeight: 300
      }}>
        {gap}
      </p>
    </>
  )
}

export default TimeCell
