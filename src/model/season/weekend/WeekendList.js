// model
import Weekend from "./Weekend"

class WeekendList {
  constructor(data) {
    return data.map(weekend => new Weekend(weekend))
  }
}

export default WeekendList