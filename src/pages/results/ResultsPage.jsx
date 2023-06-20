// components
import ResultsContent from './content/ResultsContent'

// styles
import './ResultsPage.css'

const ResultsPage = () => {
  return (
    <main className="results-page__container">
      <h1 className="page__title">Results</h1>

      <ResultsContent />
    </main>
  )
}

export default ResultsPage