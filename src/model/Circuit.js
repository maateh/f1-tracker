class Circuit {
  constructor(data) {
    this.id = data.circuitId
    this.name = data.circuitName
    this.wikiUrl = data.url
    this.location = data.Location
  }
}

export default Circuit