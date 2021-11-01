import React from 'react'

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }
   
    
    return (
        <nav className="pagination--wrapper">
            <ul>
                {pageNumbers.map(number => (
                    <li key={number} onClick={() =>paginate(number)} className={currentPage === number ? "pagination--item pagination--item__active" : "pagination--item"}>
                        <span className="pagination--link">{number}</span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
