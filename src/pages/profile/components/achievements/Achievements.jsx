// components
import Achievement from "./Achievement"
import AchievementsSkeleton from "../../../../components/skeletons/profile/achievement/AchievementsSkeleton"

// styles
import './Achievements.css'

const SECTION_TITLE = "Career Achievements"

const Achievements = ({ useAchievements, note }) => {
  const { achievements } = useAchievements()

	return achievements ? (
    <AchievementsSkeleton titleFallback={SECTION_TITLE} />
    // <section className="achievements-holder__container">
    //   <h2 className="achievements__title">{SECTION_TITLE}</h2>

    //   <div className="achievements__container">
    //     {achievements.map((achievement, index) => (
    //       <Achievement
    //         key={index}
    //         icon={achievement.icon}
    //         label={achievement.label}
    //         data={achievement.data}
    //       />
    //     ))}
    //   </div>

    //   {note && <p className="achievements__note">{note}</p>}
    // </section>
	) : (
    <AchievementsSkeleton titleFallback={SECTION_TITLE} />
  )
}

export default Achievements
