// models
import ParseError from "../../../../error/ParseError"

class Constructor {
	constructor({ id, wiki, name, nationality }) {
		this.id = id
		this.wiki = wiki
		this.name = name
		this.nationality = nationality
	}

	static parseList({ Constructors: constructors }) {
		if (constructors && constructors.length) {
			return constructors.map(constructor => this.parser({ Constructor: constructor }))
		}
	}

	static parser({ Constructor: constructor }) {
		try {
			return new Constructor({
				id: constructor.constructorId,
				wiki: constructor.url,
				name: constructor.name,
				nationality: constructor.nationality
			})
		} catch (err) {
			throw new ParseError(err.message)
		}
	}
}

export default Constructor
