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

  get fullName() {
    return `${this.givenName} ${this.familyName}`
  }
}

export default Driver