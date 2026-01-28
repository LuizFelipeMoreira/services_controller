import React from 'react';
import { IService } from '../../@types/IService';
import { useService } from '../../hooks/useService';
import { DeleteServiceModal } from '../ModalDelete';
import { UpdateServiceModal } from '../ModalUpdate';

export const Table = () => {
  const { serviceList, releaseServiceById } = useService();
  const [modalConfirmShow, setModalConfirmShow] = React.useState(false);
  const [modalType, setModalType] = React.useState<'edit' | 'delete'>('edit');
  const [selectedService, setSelectedService] = React.useState({} as IService);

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

  const onRelease = (service: IService) => {
    releaseServiceById(service.id);
  };

  const modifyLocalDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-br', {
      month: '2-digit',
      day: '2-digit',
    });
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
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody className="service-list">
          {serviceList.map((service) => (
            <tr className="service" key={service.id}>
              <td>{service.nome}</td>
              <td>{service.lente}</td>
              <td>{service.laboratorio}</td>
              <td>{modifyLocalDate(service.createdAt)}</td>
              <td>{modifyLocalDate(service.dataEntrega)}</td>
              <td>{service.situacao}</td>
              <td>{service.os}</td>
              <td className="d-flex gap-3 p-3 align-items-center">
                <i
                  className="fa-solid fa-pen text-primary fs-5 cursor-pointer"
                  onClick={() => onEdit(service)}
                />

                <i
                  className="fa-solid fa-trash text-danger fs-5 cursor-pointer"
                  onClick={() => onDelete(service)}
                />

                {service.situacao !== 'entregue' && (
                  <i
                    className="fa-regular fa-circle-check text-success fs-5 cursor-pointer"
                    onClick={() => onRelease(service)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
