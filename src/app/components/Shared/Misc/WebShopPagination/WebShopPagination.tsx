import React, { useEffect, useState } from 'react';
import './styles.scss';

interface WebShopPaginationProps {
  onPageNumberOrSizeChange: (pageNumber: number, pageSize: number) => void;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
}

const WebShopPagination = ({
  onPageNumberOrSizeChange,
  totalElements,
  currentPage,
  pageSize,
  isLoading,
}: WebShopPaginationProps) => {
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(Math.ceil(totalElements / pageSize));
  }, [totalElements, pageSize]);

  const onPageEarlierClick = () => {
    if (currentPage - 1 > 0 && !isLoading) {
      onPageNumberOrSizeChange(currentPage - 1, pageSize);
    }
  };

  const onPageLaterClick = () => {
    if (currentPage !== totalPages && !isLoading) {
      onPageNumberOrSizeChange(currentPage + 1, pageSize);
    }
  };

  const onPageNumberClick = (pageNumber: number) => {
    if (!isLoading) {
      onPageNumberOrSizeChange(pageNumber, pageSize);
    }
  };

  return (
    <div className='pagination'>
      <a onClick={onPageEarlierClick}>&laquo;</a>
      {Array.from(Array(totalPages).keys()).map(pageNumber => (
        <a
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber + 1)}
          className={`${pageNumber + 1 === currentPage ? `active` : ``}`}
        >
          {pageNumber + 1}
        </a>
      ))}
      <a onClick={onPageLaterClick}>&raquo;</a>
    </div>
  );
};

export default WebShopPagination;
