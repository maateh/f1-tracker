// components
import RoundLapsListing from '../components/listing/RoundLapsListing'
import DriverLapsListing from '../components/listing/DriverLapsListing'

// models
import FilterOption from '../../../../../model/filter/FilterOption'

export const lapsLoader = ({ params: { driverId } }) => {
  return driverId === FilterOption.ALL.value 
    ? <RoundLapsListing /> 
    : <DriverLapsListing />
}
