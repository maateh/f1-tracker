// components
import RoundPitsListing from '../components/listing/RoundPitsListing'
import DriverPitsListing from '../components/listing/DriverPitsListing'

// models
import FilterOption from '../../../../../model/filter/FilterOption'

export const pitsLoader = ({ params: { driverId } }) => {
  return driverId === FilterOption.ALL.value 
    ? <RoundPitsListing /> 
    : <DriverPitsListing />
}
