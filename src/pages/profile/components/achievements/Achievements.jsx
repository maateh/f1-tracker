// components
import Achievement from "./Achievement"
import LoadingHandler from "../../../../components/loading/LoadingHandler"

// styles
import './Achievements.css'

const Achievements = ({ useAchievements, note }) => {
  const { achievements } = useAchievements()

	// TODO - loading layouts
	return !achievements ? (
		<LoadingHandler isLoading={true} />
	) : (
    <section className="achievements-holder__container">
      <h2 className="achievements__title">Career Achievements</h2>

      <div className="achievements__container">
        {achievements.map((achievement, index) => (
          <Achievement
            key={index}
            icon={achievement.icon}
            label={achievement.label}
            data={achievement.data}
          />
        ))}
      </div>

      {note && <p className="achievements__note">{note}</p>}
    </section>
  )
}

export default Achievements
