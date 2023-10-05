// components
import Card from '../../components/card/Card'
import Linking from '../../../../linking/Linking'

// constants
import { LINKING_SIZE_SMALL } from '../../../../linking/constants/LinkingConstants'
import { CARD_COLOR_SECONDARY, CARD_SIZE_LARGE, CARD_SIZE_MEDIUM } from '../../components/card/constants/CardConstants'

// styles
import './SummaryCard.css'

const SummaryCard = ({ card }) => {
  return (
    <Card
      size={CARD_SIZE_LARGE}
      bgColor={CARD_COLOR_SECONDARY}
      borderColor={CARD_COLOR_SECONDARY}
      classNames="summary"
    >
      <p className="summary-card-title">{card.title}</p>
      <div className="summaries__container">
        {card.summaries.map(summary => (
          <div className="summary" key={summary.title}>
            <p className="icon__container">
              <span className="summary-icon">{summary.icon}</span>
              <span className="summary-title">{summary.title}</span>
            </p>

            {summary.link ? (
              <Linking
                text={summary.desc}
                link={summary.link}
                launchIcon={true}
                darkMode={true}
                size={LINKING_SIZE_SMALL}
                textStyles={{ fontSize: '1.1rem', fontWeight: '300' }}
              />
            ) : (
              <p className="summary-desc">{summary.desc}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
    // <li className="summary-card__container">
    //   <p className="summary-card-title">{card.title}</p>

    //   <div className="summaries__container">
    //     {card.summaries.map(summary => (
    //       <div className="summary" key={summary.title}>
    //         <p className="icon__container">
    //           <span className="summary-icon">{summary.icon}</span>
    //           <span className="summary-title">{summary.title}</span>
    //         </p>

    //         {summary.link ? (
    //           <Linking
    //             text={summary.desc}
    //             link={summary.link}
    //             launchIcon={true}
    //             darkMode={true}
    //             size={LINKING_SIZE_SMALL}
    //             textStyles={{ fontSize: '1.1rem', fontWeight: '300' }}
    //           />
    //         ) : (
    //           <p className="summary-desc">{summary.desc}</p>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </li>
  )
}

export default SummaryCard
