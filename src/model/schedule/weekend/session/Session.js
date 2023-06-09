import SessionTimer from "./SessionTimer";

class Session extends SessionTimer {
  constructor(data) {
    super(data)
    this.key = data.key
    this.title = data.title
  }
}

export default Session