// models
import RoundLapsListing from "../../../../../../model/listing/history/laps/RoundLapsListing";

export const roundLapsQuery = ({ year, round, page: lap }) => ({
  queryKey: ['listing', 'laps', year, round, lap],
  queryFn: () => RoundLapsListing.query(year, round, lap)
})
