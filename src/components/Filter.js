import React from 'react'

const Filter = ({ sort, sortProducts }) => {
    return (
        <div className="filter-sort">
            <select value={sort} onChange={sortProducts}>
                <option>Latest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
            </select>
        </div>
    )
}

export default Filter
