// models
import RoundLapsListing from "../../../../../../model/listing/history/laps/round/RoundLapsListing";

export const roundLapsLoader = ({ year, round, page: lap }) => ({
  queryKey: ['listing', 'laps', year, round, lap],
  queryFn: () => RoundLapsListing.query(year, round, lap)
})
