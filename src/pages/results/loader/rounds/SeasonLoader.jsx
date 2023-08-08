// model
import SeasonListing from '../../../../model/listing/results/rounds/SeasonListing'

export const seasonLoader = ({ year }) => {
  return {
    queryKey: ['listing', 'results', year], 
    queryFn: () => SeasonListing.query(year)
  }
}
