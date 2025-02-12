import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useService } from '../../hooks/useService';
import { IService } from '../../@types/IService';

interface PaginationComponentsProps {
  searchQuery: string;
  activePage: number;
  setActivePage: (page: number) => void;
}

interface ICacheData {
  [page: number]: IService[];
}

export const PaginationComponent = ({
  searchQuery,
  activePage,
  setActivePage,
}: PaginationComponentsProps) => {
  const { serviceList, totalServices, getServicesPaginated } = useService();
  const [cacheData, setCacheData] = React.useState<ICacheData>({});
  const limitPagination = Math.ceil(totalServices / 10);

  React.useEffect(() => {
    if (serviceList.length === 0) handleActivePage(activePage - 1);
  }, [totalServices, serviceList]);

  const handleActivePage = (page: number) => {
    if (page < 1 || page > limitPagination) return;

    setActivePage(page);

    if (!searchQuery) {
      getServicesPaginated(page, 10);
      setCacheData({ ...cacheData, [page]: serviceList });
      return;
    }
  };

  const paginationItems = [];
  for (let i = 1; i <= limitPagination; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === activePage}
        onClick={() => handleActivePage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="mt-2 d-flex justify-content-end">
      <Pagination.Prev onClick={() => handleActivePage(activePage - 1)} />
      {paginationItems}
      <Pagination.Ellipsis />
      <Pagination.Next onClick={() => handleActivePage(activePage + 1)} />
    </Pagination>
  );
};
