import { useSearchParams } from 'react-router-dom'

const Search = ({ title }) => {
	const [searchParams, setSearchParams] = useSearchParams()

	return (
		<div className="search__container">
      <label>
        <span className="search-title">{title}</span>
			  <input
          className="search-bar"
          value={searchParams.get('q')}
          onChange={e => setSearchParams({ q: e.target.value })}
          type="search"
        />
      </label>
		</div>
	)
}

export default Search
