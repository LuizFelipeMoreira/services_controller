import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useService } from '../../hooks/useService';
import { IService } from '../../@types/IService';

interface PaginationComponentsProps {
  activePage: number;
  setActivePage: (page: number) => void;
}

interface ICacheData {
  [page: number]: IService[];
}

export const PaginationComponent = ({
  activePage,
  setActivePage,
}: PaginationComponentsProps) => {
  const { serviceList, getServicesPaginated } = useService();

  const [cacheData, setCacheData] = React.useState<ICacheData>({});

  const items = [];

  const handleActivePage = (page: number) => {
    const isValidPage = page >= 1 && page <= 5;

    if (isValidPage) {
      setActivePage(page);
      getServicesPaginated(page, 10);
      setCacheData({ ...cacheData, [page]: serviceList });
    }
  };

  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePage}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination className="mt-2 d-flex justify-content-end">
      <Pagination.Prev onClick={() => handleActivePage(activePage - 1)} />
      {items}
      <Pagination.Next onClick={() => handleActivePage(activePage + 1)} />
    </Pagination>
  );
};
