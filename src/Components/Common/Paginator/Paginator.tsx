//Imports
import React, { useState } from 'react';
import s from './Paginator.module.css';
import cn from "classnames"

//Types
type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber:number) => void
    partSize?: number
}


//Paginator Component
let Paginator: React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage, onPageChange, partSize = 10 }) => {
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
//Export
export default Paginator;