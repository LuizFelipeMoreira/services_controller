import React from 'react';
import './styles.scss';

import { FormField, FormSelect, ModalService } from '../Modal';

import { ServicesType } from '../../@types/ServicesType';

import { Modal, Button } from 'react-bootstrap';

import { GET_SERVICES } from '../../services/handleRequests';
//import { DELETE_SERVICE } from '../../api/api';

type ModalType = 'edit' | 'delete';

export const Main = () => {
  const [open, setOpen] = React.useState(false);
  const [services, setServices] = React.useState<ServicesType[]>([]);
  const [typeModal, setTypeModal] = React.useState<ModalType>('edit');
  const [ModalConfirmShow, setModalConfirmShow] = React.useState(false);

  const handleModal = (action: ModalType) => {
    setTypeModal(action);
    setModalConfirmShow(!ModalConfirmShow);
  };

  React.useEffect(() => {
    GET_SERVICES().then((data) => {
      setServices(data);
    });

    console.log(services);
  }, []);

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
        <form action="" className="form-search">
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

          <div className="field ">
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
          {services &&
            services.map((service) => (
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
                    type="submit"
                    className="btn btn-primary"
                    id={service.id?.toString()}
                    onClick={() => handleModal('edit')}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>

                  <button
                    type="submit"
                    id={service.id?.toString()}
                    className="btn btn-danger"
                    onClick={() => handleModal('delete')}
                  >
                    <i className="fa-solid fa-trash delete-button"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <ModalConfirm
        type={typeModal}
        modalConfirmShow={ModalConfirmShow}
        setModalConfirmShow={setModalConfirmShow}
      />

      <ModalService open={open} setOpen={setOpen} setServices={setServices} />
    </main>
  );
};

interface ModalConfirmProps {
  type: ModalType;
  setModalConfirmShow: (arg: boolean) => void;
  modalConfirmShow: boolean;
}

const ModalConfirm = ({
  type,
  setModalConfirmShow,
  modalConfirmShow,
}: ModalConfirmProps) => {
  const initialServiceData = { nome: '', lente: '', laboratorio: '', os: '' };
  const [data, setData] = React.useState<ServicesType>(initialServiceData);

  const submitModal = () => {
    if (type === 'edit') {
      console.log('edit');
    } else if (type === 'delete') {
      console.log('delete');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={modalConfirmShow}>
      <Modal.Header
        closeButton
        onHide={() => setModalConfirmShow(!modalConfirmShow)}
      >
        <Modal.Title>
          {type === 'edit'
            ? 'Deseja editar esse servico ?'
            : 'Deseja deletar esse servico ?'}
        </Modal.Title>
      </Modal.Header>

      {type === 'edit' && (
        <Modal.Body>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
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
        <Button variant="secondary" onClick={() => setModalConfirmShow(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={submitModal}>
          Salvar mudanças
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
