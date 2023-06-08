import SessionList from "./SessionList";
import Circuit from "../Circuit";

class RaceWeekend extends SessionList {
	constructor(data) {
    const raceInfo = data.Races[0]
    super(raceInfo)
    this.round = raceInfo.round
    this.season = raceInfo.season

		this.name = raceInfo.raceName
		this.wikiUrl = raceInfo.url
		this.circuit = new Circuit(raceInfo.Circuit)
	}

	get active() {
		return this.sessions.practices[0].start < Date.now()
	}
}

export default RaceWeekend
