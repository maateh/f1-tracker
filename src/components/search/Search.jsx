import { useSearchParams } from 'react-router-dom'

const Search = ({ title }) => {
	const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = event => {
    const query = event.target.value
    if (query) {
      setSearchParams({ q: event.target.value })
      return
    }
    searchParams.delete('q')
    setSearchParams(searchParams)
  }

	return (
		<div className="search__container">
      <label>
        <span className="search-title">{title}</span>
			  <input
          className="search-bar"
          value={searchParams.get('q') || ''}
          onChange={handleChange}
          type="search"
        />
      </label>
		</div>
	)
}

export default Search
