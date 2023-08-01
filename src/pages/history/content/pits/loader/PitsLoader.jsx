// loaders
import { driverPitsLoader } from './driver/DriverPitsLoader'
import { constructorPitsLoader } from './constructor/ConstructorPitsLoader'

export const pitsLoader = ({ params }) => {
  if (params.type === 'constructor') {
    return constructorPitsLoader(params)
  }
  return driverPitsLoader(params)
}
