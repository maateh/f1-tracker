import SessionTimer from "./SessionTimer";

class Session extends SessionTimer {
  constructor(sessionInfo) {
    super(sessionInfo)
    this.key = sessionInfo.key
    this.title = sessionInfo.title
  }
}

export default Session