const GOOGLE_MAPS_LINK = 'https://maps.google.com/maps'

class Circuit {
	constructor({ id, name, wiki, location }) {
		this.id = id
		this.name = name
		this.wiki = wiki
		this.location = location
	}

	static parseList({ Circuits: circuits }) {
		if (circuits && circuits.length) {
			return circuits.map(circuit => this.parser({ Circuit: circuit }))
		}
	}

	static parser({ Circuit: circuit }) {
		return new Circuit({
			id: circuit.circuitId,
			name: circuit.circuitName,
			wiki: circuit.url,
			location: circuit.Location,
		})
	}

	getLocality() {
		return `${this.location.country}, ${this.location.locality}`
	}

	getMapsLink() {
		return `${GOOGLE_MAPS_LINK}?q=${this.location.lat},${this.location.long}`
	}
}

export default Circuit
