class Driver {
  constructor(data) {
    this.id = data.driverId
    this.number = data.permamentNumber
    this.code = data.code
    this.wiki = data.url
    this.givenName = data.givenName
    this.familyName = data.familyName
    this.nationality = data.nationality
  }
}

export default Driver