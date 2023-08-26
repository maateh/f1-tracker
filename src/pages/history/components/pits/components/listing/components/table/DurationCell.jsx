const DurationCell = ({ duration, gap }) => {
  return (
    <>
      <p style={{
        fontSize: !gap.includes('+') ? '1.15rem' : '1.1rem',
        fontWeight: !gap.includes('+') ? 700 : 500
      }}>
        {duration}
      </p>


      <p style={{
        fontSize: !gap.includes('+') ? '0.9rem' : '0.95rem',
        fontWeight: !gap.includes('+') ? 700 : 300
      }}>
        {gap}
      </p>
    </>
  )
}

export default DurationCell
