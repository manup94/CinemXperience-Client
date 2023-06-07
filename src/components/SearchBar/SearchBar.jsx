import { useState } from "react"

const SearchBar = ({ filterData }) => {
    const [textQuery, setTextQuery] = useState('')

    const handleSearch = e => {
        const inputValue = e.target.value
        setTextQuery(inputValue)
        filterData(inputValue)
    }

    return (
        <>
            <input className="form-control" type="text" placeholder="Search..." value={textQuery} onChange={handleSearch} />
        </>
    )
}

export default SearchBar