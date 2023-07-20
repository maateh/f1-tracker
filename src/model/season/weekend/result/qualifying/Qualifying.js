// model
import Constructor from "../constructor/Constructor"
import Driver from "../driver/Driver"

class Qualifying {
  constructor(data) {
    this.number = data?.number || '-'
    this.position = data?.position || '-'

    this.q1 = data?.Q1 || '-'
    this.q2 = data?.Q2 || '-'
    this.q3 = data?.Q3 || '-'

    this.parseDriver(data)
    this.parseConstructor(data)
  }

  parseDriver(data) {
    if (data?.Driver) {
      this.driver = new Driver(data.Driver)
    }
  }

  parseConstructor(data) {
    if (data?.Constructor) {
      this.constructor = new Constructor(data.Constructor)
    }
  }

  get time() {
    return this.q3 ? this.q3 : this.q2 ? this.q2 : this.q1
  }
}

export default Qualifying