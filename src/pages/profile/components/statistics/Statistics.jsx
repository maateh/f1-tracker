// components
import Statistic from './Statistic'
import LoadingHandler from '../../../../components/loading/LoadingHandler'

// styles
import './Statistics.css'

const Statistics = ({ title, stats: mockStats, useStatsQuery }) => {
	// TODO - queries
	const { data: stats, isLoading, isError, error } = useStatsQuery()

	// TODO - loading layouts
	return isLoading || isError || error ? (
		<LoadingHandler
			isLoading={isLoading}
			isError={isError}
			error={error}
		/>
	) : (
		// return (
		<div className="stats__container">
			<h3 className="stats__title">{title}</h3>

			<div className="stats-data__container">
				{(stats ? stats : mockStats).map((stat, index) => (
					<Statistic
						key={index}
						label={stat.label}
						data={stat.data}
						icon={stat.icon}
					/>
				))}
			</div>
		</div>
	)
}

export default Statistics
