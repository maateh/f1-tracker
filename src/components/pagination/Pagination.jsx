import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

// components
import PaginationItem from "./PaginationItem"

// styles
import './Pagination.css'

const range = (start, end) => [...Array(end - start).keys()].map(el => el + start)

const getPagesCut = ({ pages, cut, current }) => {
  const top = Math.ceil(cut / 2)
  const bottom = Math.floor(cut / 2)

  return pages < cut ? {
    start: 1,
    end: pages + 1
  } : current >= 1 && current <= top ? {
    start: 1,
    end: cut + 1
  } : current + bottom >= pages ? {
    start: pages - cut + 1,
    end: pages + 1
  } : {
    start: current - top + 1,
    end: current + bottom + 1
  }
}

const Pagination = ({ max }) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const current = +searchParams.get('page') || 1
  const pagesCut = getPagesCut({ pages: max, cut: 9, current })
  const pages = range(pagesCut.start, pagesCut.end)
  

  useEffect(() => {
    const search = `?${searchParams.toString()}`
    navigate({ search }, { replace: true })
  }, [navigate, searchParams])

  return (
    <ul className="pagination">
      <PaginationItem 
        current={current}
        page="First" 
        setSearchParams={() => setSearchParams({ page: 1 })} 
        disabled={current <= 1}
      />
      <PaginationItem 
        current={current}
        page="Previous" 
        setSearchParams={() => setSearchParams({ page: current - 1 })} 
        disabled={current <= 1}
      />

      {pages.map(page => (
        <PaginationItem 
          key={page}
          current={current}
          page={page} 
          setSearchParams={setSearchParams} 
          disabled={false}
        />
      ))}

      <PaginationItem 
        current={current}
        page="Next" 
        setSearchParams={() => setSearchParams({ page: current + 1 })} 
        disabled={current >= max}
      />
      <PaginationItem 
        current={current}
        page="Last" 
        setSearchParams={() => setSearchParams({ page: max })} 
        disabled={current >= max}
      />
    </ul>
  )
}

export default Pagination