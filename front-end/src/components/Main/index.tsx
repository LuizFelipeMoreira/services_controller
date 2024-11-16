import React, { useEffect, useRef } from 'react';
import './styles.scss';

import { FormField, FormSelect, ModalService } from '../Modal';

import { ServicesType } from '../../@types/ServicesType';

import { Modal, Button, Pagination } from 'react-bootstrap';

import { useService } from '../../hooks/useService';

type ModalType = 'edit' | 'delete';

export const Main = () => {
  const [open, setOpen] = React.useState(false);
  const [modalConfirmShow, setModalConfirmShow] = React.useState(false);

  const [modalType, setModalType] = React.useState<ModalType>('edit');
  const [selectedService, setSelectedService] =
    React.useState<ServicesType | null>(null);

  const [activePage, setActivePage] = React.useState(1);
  const items = [];

  const { serviceList } = useService();

  const handleModal = (action: ModalType, service: ServicesType) => {
    setModalType(action);
    setSelectedService(service);
    setModalConfirmShow(true);
  };

  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePage}>
        {number}
      </Pagination.Item>
    );
  }

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
              <td>15/05/2024</td>
              <td>18/05/2024</td>
              <td>entregue</td>
              <td>{service.os}</td>
              <td className="d-flex gap-1">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleModal('edit', service)}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleModal('delete', service)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination className="mt-2 d-flex justify-content-end">
        <Pagination.Prev onClick={() => setActivePage(activePage - 1)} />
        {items}
        <Pagination.Next onClick={() => setActivePage(activePage + 1)} />
      </Pagination>

      {selectedService && (
        <ModalConfirm
          service={selectedService}
          type={modalType}
          modalConfirmShow={modalConfirmShow}
          setModalConfirmShow={setModalConfirmShow}
        />
      )}

      <ModalService open={open} setOpen={setOpen} />
    </main>
  );
};

interface ModalConfirmProps {
  type: ModalType;
  modalConfirmShow: boolean;
  service: ServicesType;
  setModalConfirmShow: (arg: boolean) => void;
}

const ModalConfirm = ({
  type,
  setModalConfirmShow,
  modalConfirmShow,
  service,
}: ModalConfirmProps) => {
  const [data, setData] = React.useState<ServicesType>(service);
  const { deleteServiceList, updateService } = useService();
  const FormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setData(service);
  }, [service]);

  const submitModal = async () => {
    console.log(data);

    switch (type) {
      case 'edit':
        if (data.id) updateService(data);
        resetForm();

        break;
      case 'delete':
        if (data.id) deleteServiceList(data.id);

        break;
      default:
    }

    setModalConfirmShow(false);
  };

  const resetForm = () => {
    setData({ nome: '', lente: '', laboratorio: '', os: '' });
    FormRef.current?.reset();
  };

  const handleClose = () => {
    resetForm();
    setModalConfirmShow(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={modalConfirmShow}>
      <Modal.Header closeButton onHide={() => setModalConfirmShow(false)}>
        <Modal.Title>
          {type === 'edit'
            ? 'Deseja editar esse serviço?'
            : 'Deseja deletar esse serviço?'}
        </Modal.Title>
      </Modal.Header>

      {type === 'edit' && (
        <Modal.Body>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            ref={FormRef}
          >
            <FormField
              label="Nome"
              type="text"
              name="nome"
              value={data.nome}
              onChange={handleChange}
              required
            />
            <FormField
              label="Lente"
              type="text"
              name="lente"
              value={data.lente}
              onChange={handleChange}
              required
            />
            <FormSelect
              label="Laboratório"
              name="laboratorio"
              options={[
                { value: 'wave-pg', label: 'Wave pg' },
                { value: 'wave-sv', label: 'Wave sv' },
              ]}
              value={data.laboratorio}
              onChange={handleChange}
              required
            />
            <FormField
              label="Número de OS"
              type="text"
              name="os"
              value={data.os}
              onChange={handleChange}
              required
            />
            <FormField
              label="Data de ida"
              type="date"
              name="dataIda"
              required
            />
            <FormField
              label="Data de entrega"
              type="date"
              name="dataEntrega"
              required
            />
          </form>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={submitModal}>
          Salvar mudanças
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
