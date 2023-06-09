import WeekendList from "./weekend/WeekendList"

class Schedule {
  constructor(data) {
    this.year = data.season
    
    this.parseWeekends(data)
  }

  parseWeekends(data) {
    if (data.Races) {
      this.weekends = new WeekendList(data)
    }
  }
}

export default Schedule