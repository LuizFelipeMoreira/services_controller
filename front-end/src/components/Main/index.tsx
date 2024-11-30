import React from 'react';
import './styles.scss';

import { ServicesType } from '../../@types/ServicesType';

import { NewServiceModal } from '../NewServiceModal';
import { Table } from '../Table';
import { ServiceActionModal } from '../ServiceActionModal';

type ModalType = 'edit' | 'delete';

export const Main = () => {
  const [open, setOpen] = React.useState(false);
  const [modalConfirmShow, setModalConfirmShow] = React.useState(false);

  const [modalType, setModalType] = React.useState<'edit' | 'delete'>('edit');
  const [selectedService, setSelectedService] = React.useState(
    {} as ServicesType
  );

  const handleModal = (action: ModalType, service: ServicesType) => {
    setModalType(action);
    setSelectedService(service);
    setModalConfirmShow(true);
  };

  return (
    <main className="main">
      <div className="wrapper">
        <h4 className="fw-bold">Lista de Serviços</h4>
        <button
          type="button"
          className="btn-new-service"
          data-bs-toggle="modal"
          onClick={() => setOpen(true)}
        >
          Adicionar serviço
        </button>
      </div>

      <p className="title-table fw-semibold">Clientes</p>
      <hr />

      <div className="research-field">
        <form className="form-search">
          <div className="field">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              name="search"
              id="search"
              className="input"
              placeholder="Pesquisar..."
            />
          </div>
          <div className="field">
            <label>Data de entrega: </label>
            <input type="date" name="dataEntrega" id="date" className="input" />
          </div>
          <button type="submit" className="submit-btn">
            <i className="fa-solid fa-arrow-down-wide-short"></i>
          </button>
        </form>
      </div>

      <Table
        setModalConfirmShow={setModalConfirmShow}
        modalConfirShow={modalConfirmShow}
      />

      <ServiceActionModal
        service={selectedService}
        type={modalType}
        modalConfirmShow={modalConfirmShow}
        setModalConfirmShow={setModalConfirmShow}
      />

      <NewServiceModal open={open} setOpen={setOpen} />
    </main>
  );
};
