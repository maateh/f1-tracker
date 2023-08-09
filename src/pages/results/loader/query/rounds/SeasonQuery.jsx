// model
import SeasonListing from '../../../../../model/listing/results/rounds/SeasonListing'

export const seasonQuery = ({ year }) => ({
  queryKey: ['listing', 'results', year], 
  queryFn: () => SeasonListing.query(year)
})
