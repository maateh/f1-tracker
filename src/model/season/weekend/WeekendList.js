import Weekend from "./Weekend"

class WeekendList {
  constructor(data) {
    return data.Races.map(weekend => new Weekend(weekend))
  }
}

export default WeekendList