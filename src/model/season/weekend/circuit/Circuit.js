const GOOGLE_MAPS_LINK = 'https://maps.google.com/maps'

class Circuit {
  constructor(data) {
    this.id = data.circuitId
    this.name = data.circuitName
    this.wiki = data.url
    this.location = data.Location
    this.maps = `${GOOGLE_MAPS_LINK}?q=${this.location.lat},${this.location.long}`
  }
}

export default Circuit