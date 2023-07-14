// model
import SeasonListing from '../../../../../../model/listing/rounds/SeasonListing'

const seasonLoader = ({ params: { year } }) => {
  return {
    queryKey: ['listing', 'results', year], 
    queryFn: () => SeasonListing.query(year)
  }
}

export default seasonLoader
