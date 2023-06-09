import Result from "./Result"

class ResultList {
  constructor(data) {
    return data.Results.map(result => new Result(result))
  }
}

export default ResultList