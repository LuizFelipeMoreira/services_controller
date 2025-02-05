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
  const { serviceList, totalServices, getServicesPaginated } = useService();
  const [cacheData, setCacheData] = React.useState<ICacheData>({});
  const limitPagination = Math.ceil(totalServices / 10);
  const items = [];

  React.useEffect(() => {
    if (serviceList.length === 0) handleActivePage(activePage - 1);
  }, [totalServices]);

  const handleActivePage = (page: number) => {
    const isValidPage = page >= 1 && page <= limitPagination;

    if (isValidPage) {
      setActivePage(page);
      getServicesPaginated(page, 10);
      setCacheData({ ...cacheData, [page]: serviceList });
    }
  };

  for (let number = 1; number <= limitPagination; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => handleActivePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="mt-2 d-flex justify-content-end">
      <Pagination.Prev onClick={() => handleActivePage(activePage - 1)} />
      {items}
      <Pagination.Ellipsis />
      <Pagination.Next onClick={() => handleActivePage(activePage + 1)} />
    </Pagination>
  );
};
