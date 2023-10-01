// components
import Statistic from './Statistic'
import StatisticsSkeleton from '../../../../components/skeletons/profile/statistics/StatisticsSkeleton'

// styles
import './Statistics.css'

const Statistics = ({ title, note, useStatsQuery }) => {
	const { data: stats, isLoading, isError } = useStatsQuery()

	return !isLoading && stats ? (
		<div className="stats__container">
			<h3 className="stats__title">{title}</h3>

			<div className="stats-data__container">
				{stats.map((stat, index) => (
					<Statistic
						key={index}
						label={stat.label}
						data={stat.data}
						icon={stat.icon}
					/>
				))}
			</div>

			{note && <p className="stats__note">{note}</p>}
		</div>
	) : (
		<StatisticsSkeleton titleFallback={title} />
	)
}

export default Statistics
