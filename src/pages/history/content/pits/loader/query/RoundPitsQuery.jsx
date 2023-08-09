// models
import RoundPitsListing from "../../../../../../model/listing/history/pits/RoundPitsListing";

export const roundPitsQuery = ({ year, round, page }) => ({
  queryKey: ['listing', 'pits', year, round, page],
  queryFn: () => RoundPitsListing.query(year, round, page)
})
