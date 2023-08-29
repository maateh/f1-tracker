class Constructor {
	constructor({ id, wiki, name, nationality }) {
		this.id = id
		this.wiki = wiki
		this.name = name
		this.nationality = nationality
	}

	static parser({ Constructor: constructor }) {
		return new Constructor({
			id: constructor.constructorId,
			wiki: constructor.url,
			name: constructor.name,
			nationality: constructor.nationality,
		})
	}
}

export default Constructor
