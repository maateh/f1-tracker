import SessionList from "./SessionList";
import Circuit from "../Circuit";

class RaceWeekend extends SessionList {
	constructor(data) {
    const raceInfo = data.Races[0]
    super(raceInfo)
    this.round = data.round
    this.season = data.season

		this.name = raceInfo.raceName
		this.wikiUrl = raceInfo.url
		this.circuit = new Circuit(raceInfo.Circuit)
	}

	nextSessionTitle() {
    // TODO:
    // itt a konkrét session-t kéne visszaadni, nem csak a title-t
    // const session = ...

		const practice = this.sessions.practices.find((p) => p.isOver())
    console.log('PRACTICE: ', practice)
		if (practice) {
			return practice.title
		}

		if (this.sessions.qualifying.isOver()) {
			return 'Qualifying'
		}

		return 'Racing Time!'
	}
}

export default RaceWeekend
