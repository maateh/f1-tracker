// styles
import './ResultsCard.css'

const ResultsCard = ({ card }) => {
  return (
    <div className="results-card__container">
      <p className="results-card-title">{card.title}</p>

      <div className="summaries__container">
        {card.summaries.map(summary => (
          <div className="summary" key={summary.title}>
            <span className="summary-icon">{summary.icon}</span>
            <span className="summary-title">{summary.title}</span>
            <p className="summary-desc">{summary.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultsCard
