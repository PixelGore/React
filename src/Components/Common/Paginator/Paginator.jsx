import React, { useState } from 'react';
import s from './Paginator.module.css';
import cn from "classnames"

let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChange, partSize = 10 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    let partCount = Math.ceil(pagesCount / partSize);
    let [partNumber, setPartNumber] = useState(1);
    let leftPartPageNumber = (partNumber - 1) * partSize + 1;
    let rightPartPageNumber = partNumber * partSize

    return <div className={s.paginator} >
        {partNumber > 1 &&
            <button className={s.btn} onClick={() => { setPartNumber(partNumber - 1) }}>{"<<"}</button>}
        {pages
            .filter(p => p >= leftPartPageNumber && p <= rightPartPageNumber)
            .map(p => {
                return <span className={cn({
                    [s.selectedPage]: currentPage === p
                }, s.pageNumber)}
                    key={p}
                    onClick={() => { onPageChange(p) }} >{p} </span>
            })}
        {partCount > partNumber &&
            <button className={s.btn} onClick={() => { setPartNumber(partNumber + 1) }}>{">>"}</button>}
    </div>

}

export default Paginator;