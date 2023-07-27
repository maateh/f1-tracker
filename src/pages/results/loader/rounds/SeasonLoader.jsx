// model
import SeasonListing from '../../../../model/listing/results/rounds/SeasonListing'

const seasonLoader = ({ year }) => {
  return {
    queryKey: ['listing', 'results', year], 
    queryFn: () => SeasonListing.query(year)
  }
}

export default seasonLoader
