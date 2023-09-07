// styles
// import './ConstructorCard.css'

const ConstructorCard = ({ constructor, lastRef }) => {
  return (
    <li className="constructor-card__container" ref={lastRef ? lastRef : undefined}>
      <h3 className="constructor-name">{constructor.name}</h3>
      <p className="constructor-nationality">{constructor.nationality}</p>
    </li>
  )
}

export default ConstructorCard
