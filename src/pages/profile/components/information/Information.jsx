// components
import Linking from "../../../../components/linking/Linking"
import LoadingSkeleton from "../../../../components/skeletons/loading/LoadingSkeleton"

// constants
import { LINKING_SIZE_MEDIUM } from "../../../../components/linking/LinkingConstants"

// styles
import './Information.css'

const Information = ({ useInformationQuery }) => {
  const { data, isLoading, isError } = useInformationQuery()

  return !isLoading && data ? (
    <section className="information__container">
      <h2 className="page__title">{data.title}</h2>

      <div className="information-data__container">
        {data.informations.map((info, index) => (
          <p key={index} className="information-data icon__container" style={info.styles}>
            {info.icon}
            <span>{info.data}</span>
          </p>
        ))}
      </div>

      <div className="links__container">
        {data.links.map(link => (
          <Linking
            key={link.url}
            text={link.text}
            tooltipText={link.tooltipText}
            link={link.url}
            icon={link.icon}
            size={LINKING_SIZE_MEDIUM}
            launchIcon={true}
          />
        ))}
      </div>
    </section>
  ) : (
    <LoadingSkeleton linear={true} height="1rem" width="80%" />
  )
}

export default Information
