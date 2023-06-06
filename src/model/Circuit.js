class Circuit {
  constructor(circuitInfo) {
    this.id = circuitInfo.circuitId
    this.name = circuitInfo.circuitName
    this.wikiUrl = circuitInfo.url
    this.location = circuitInfo.Location
  }
}

export default Circuit