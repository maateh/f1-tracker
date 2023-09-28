// styles
import './Achievement.css'

const Achievement = ({ icon, label, data }) => {
  return (
    <div className="achievement__wrapper icon__container dark">
      <p className="achievement-label icon__container">
        {icon}
        <span className="achievement-label">{label}</span>
      </p>
      <p className="achievement-data__wrapper">
        {data.achieved && <span className="achievement-data-achieved">{data.achieved}</span>}
        {data.name && <span className="achievement-data-name">{data.name}</span>}
        {data.date && <span className="achievement-data-date">{data.date}</span>}
      </p>
    </div>
  )
}

export default Achievement
