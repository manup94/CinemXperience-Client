import { useState } from "react"
import { Row, Col, Container } from 'react-bootstrap'

const SearchBar = ({ filterData }) => {
    const [textQuery, setTextQuery] = useState('')

    const handleSearch = e => {
        const inputValue = e.target.value
        setTextQuery(inputValue)
        filterData(inputValue)
    }

    return (
        <div className="d-flex" >
            <img className="search " src="../../../search.png" alt="ticket" />
            <input className="form-control" type="text" placeholder="Search..." value={textQuery} onChange={handleSearch} />
        </div>
    )
}

export default SearchBar