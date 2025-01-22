import React from 'react';
import { Pagination } from 'react-bootstrap';
import { IService } from '../../@types/IService';
import { useService } from '../../hooks/useService';
import { DeleteServiceModal } from '../ModalDelete';
import { UpdateServiceModal } from '../ModalUpdate';

export const Table = () => {
  const { serviceList, getServicesPaginated } = useService();

  const [activePage, setActivePage] = React.useState(1);
  const [modalConfirmShow, setModalConfirmShow] = React.useState(false);

  const [modalType, setModalType] = React.useState<'edit' | 'delete'>('edit');
  const [selectedService, setSelectedService] = React.useState({} as IService);

  const items = [];

  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePage}>
        {number}
      </Pagination.Item>
    );
  }

  const handleActivePage = (page: number) => {
    const isValidPage = page >= 1 && page <= 5;

    if (isValidPage) {
      setActivePage(page);
      getServicesPaginated(page, 10);
    }
  };

  const onEdit = (service: IService) => {
    setModalType('edit');
    setSelectedService(service);
    setModalConfirmShow(!modalConfirmShow);
  };

  const onDelete = (service: IService) => {
    setModalType('delete');
    setSelectedService(service);
    setModalConfirmShow(!modalConfirmShow);
  };

  return (
    <>
      <table className="tabelinha">
        <caption>List of users</caption>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Lente</th>
            <th>Lab</th>
            <th>Ida</th>
            <th>Volta</th>
            <th>Situacao</th>
            <th>OS</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="service-list">
          {serviceList.map((service) => (
            <tr className="service" key={service.id}>
              <td>{service.nome}</td>
              <td>{service.lente}</td>
              <td>{service.laboratorio}</td>
              <td>15/05</td>
              <td>18/05</td>
              <td>entregue</td>
              <td>{service.os}</td>
              <td className="d-flex gap-1">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onEdit(service)}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDelete(service)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination className="mt-2 d-flex justify-content-end">
        <Pagination.Prev onClick={() => handleActivePage(activePage - 1)} />
        {items}
        <Pagination.Next onClick={() => handleActivePage(activePage + 1)} />
      </Pagination>

      {modalType === 'edit' && (
        <UpdateServiceModal
          data={selectedService}
          setData={setSelectedService}
          setModalConfirmShow={setModalConfirmShow}
          modalConfirmShow={modalConfirmShow}
        />
      )}

      {modalType === 'delete' && (
        <DeleteServiceModal
          id={selectedService.id}
          modalConfirmShow={modalConfirmShow}
          setModalConfirmShow={setModalConfirmShow}
        />
      )}
    </>
  );
};
