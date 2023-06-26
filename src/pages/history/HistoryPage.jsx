import HistoryContent from './content/HistoryContent'

// styles
import './HistoryPage.css'

const HistoryPage = () => {
  return (
    <main className="history-page__container">
      <h1 className="page__title">History</h1>

      <HistoryContent />
    </main>
  )
}

export default HistoryPage