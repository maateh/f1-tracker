import SeasonModel from "../../../model/season/Season";

export const scheduleLoader = ({ params: { year } }) => ({
  queryKey: ['listing', 'season', year], 
  queryFn: () => SeasonModel.query(year)
})
