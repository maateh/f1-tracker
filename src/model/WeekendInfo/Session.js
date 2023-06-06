import SessionTime from "./SessionTime";

class Session extends SessionTime {
  constructor(sessionInfo) {
    super(sessionInfo)
    this.key = sessionInfo.key
    this.title = sessionInfo.title
  }
}

export default Session