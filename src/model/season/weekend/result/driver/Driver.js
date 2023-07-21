import { format, parseISO } from "date-fns"

class Driver {
  constructor(data) {
    this.id = data.driverId
    this.number = data.permanentNumber
    this.code = data.code || data.familyName.substring(0, 3).toUpperCase()
    this.wiki = data.url
    this.givenName = data.givenName
    this.familyName = data.familyName
    this.dateOfBirth = format(parseISO(data.dateOfBirth), 'yyyy. MMMM dd.')
    this.nationality = data.nationality
  }

  get fullName() {
    return `${this.givenName} ${this.familyName}`
  }

  get formattedNumber() {
    return this.number ? `#${this.number}` : ''
  }
}

export default Driver
