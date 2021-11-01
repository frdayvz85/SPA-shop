import React from 'react'

const Search = ({setSearchTerm}) => {
    return (
        <div className="search">
            <input type="text" placeholder="Search ..." onChange={(e)=>setSearchTerm(e.target.value)} />
        </div>
    )
}

export default Search
