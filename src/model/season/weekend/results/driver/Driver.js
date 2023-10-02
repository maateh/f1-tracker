import { format, parseISO } from "date-fns"

class Driver {
  constructor({
    id,
    number,
    code,
    wiki,
    givenName,
    familyName,
    dateOfBirth,
    nationality
  }) {
    this.id = id
    this.number = number
    this.code = code
    this.wiki = wiki
    this.givenName = givenName
    this.familyName = familyName
    this.dateOfBirth = dateOfBirth
    this.nationality = nationality
  }

	static parseList({ Drivers: drivers }) {
		if (drivers && drivers.length) {
			return drivers.map(driver => this.parser({ Driver: driver }))
		}
	}

  static parser({ Driver: driver }) {
    try {
      return new Driver({
        id: driver.driverId,
        number: driver.permanentNumber,
        code: driver.code || driver.familyName.substring(0, 3).toUpperCase(),
        wiki: driver.url,
        givenName: driver.givenName,
        familyName: driver.familyName,
        dateOfBirth: driver.dateOfBirth,
        nationality: driver.nationality,
      })
    } catch (err) {
      throw new Error('ParseError')
    }
  }

  get fullName() {
    return `${this.givenName} ${this.familyName}`
  }

  get formattedDateOfBirth() {
    return format(parseISO(this.dateOfBirth), 'yyyy. MMMM dd.')
  }

  get formattedNumber() {
    return this.number ? `#${this.number}` : ''
  }
}

export default Driver
