class Season {
  constructor(data) {
    this.year = data.season
    
    // NOTE
    // A url RESULT létrehozása esetén lehet, hogy problémás lesz.
    this.wikiUrl = data.url
  }
}

export default Season