/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { useState } from "react";

function createPagesArray(number, operator, total) {
    // operator: true to add else subtract
    const firstItem = operator ? number + 1 : number - 2;
    const secondItem = operator ? number + 2 : number - 1;
    if (!operator && secondItem < 2) {
        return [secondItem];
    }
    if (operator && firstItem === total) {
        return [firstItem];
    }
    return [firstItem, secondItem];
}

function Pagination({ total, currentPage, pageSize }) {
    const [active, setActive] = useState({
        page: currentPage,
        next: false,
        prev: false,
    });
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const totalPages = Math.floor(total / pageSize);
        if (currentPage <= 0 || currentPage === 1) {
            setActive({
                page: currentPage,
                next: totalPages > 1,
                prev: false,
            });
            setPages([1]);
        } else {
            setActive({
                page: currentPage,
                next: totalPages !== currentPage,
                prev: currentPage !== 1,
            });
            const prevPages = createPagesArray(currentPage, false);
            const nextPages = createPagesArray(currentPage, true, totalPages);
            setPages([...prevPages, currentPage, ...nextPages]);
        }
    }, [currentPage, pageSize, total]);

    return (
        <nav aria-label='Table Pagination'>
            <ul className='pagination justify-content-end'>
                <li className={`page-item disabled`}>
                    <a className='page-link'>Previous</a>
                </li>
                <li className='page-item'><a className='page-link' href='#'>1</a></li>
                <li className='page-item'><a className='page-link' href='#'>2</a></li>
                <li className='page-item'><a className='page-link' href='#'>3</a></li>
                <li className='page-item'>
                    <a className='page-link' href='#'>Next</a>
                </li>
            </ul>
        </nav>
    );
}