import { Link } from 'react-router-dom'

// icons
import LaunchIcon from '@mui/icons-material/Launch'

// styles
import './SummaryCard.css'

const SummaryCard = ({ card }) => {
  return (
    <li className="summary-card__container">
      <p className="summary-card-title">{card.title}</p>

      <div className="summaries__container">
        {card.summaries.map(summary => (
          <div className="summary" key={summary.title}>
            <div className="icon__container">
              <span className="summary-icon">{summary.icon}</span>
              <span className="summary-title">{summary.title}</span>
            </div>

            {summary.link ? (
              <Link 
                className="summary-desc icon__container"
                to={summary.link}
              >
                <LaunchIcon fontSize='small' />{summary.desc}
              </Link>
            ) : (
              <p className="summary-desc">{summary.desc}</p>
            )}
          </div>
        ))}
      </div>
    </li>
  )
}

export default SummaryCard
