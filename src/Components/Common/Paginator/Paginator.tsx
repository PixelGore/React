//Imports
import React, { useState } from 'react';
import cn from "classnames"


//Paginator Component
let Paginator: React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage = 1, onPageChange = x => x, partSize = 10 }) => {
    //Total number of pages
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    //Dividing pages in parts
    let partCount = Math.ceil(pagesCount / partSize);
    let [partNumber, setPartNumber] = useState(1);
    let leftPartPageNumber = (partNumber - 1) * partSize + 1;
    let rightPartPageNumber = partNumber * partSize

    //The markup 
    return (
        <div className="pagination justify-content-center p-4" >
            {partNumber > 1 &&
                <li className="page-item">
                    <a className="page-link" aria-label="Previous" onClick={() => { setPartNumber(partNumber - 1) }}>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>}

            {pages
                .filter(p => p >= leftPartPageNumber && p <= rightPartPageNumber)
                .map(p => {
                    return <li className={cn({ "active": currentPage === p }, "page-item")}
                        key={p} onClick={() => { onPageChange(p) }} >
                        <a className="page-link">{p}</a>
                    </li>
                })}
                
            {partCount > partNumber &&
                <li className="page-item">
                    <a className="page-link" aria-label="Next" onClick={() => { setPartNumber(partNumber + 1) }}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>}
        </div>)
}
type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChange?: (pageNumber: number) => void
    partSize?: number
}

//Export
export default Paginator;