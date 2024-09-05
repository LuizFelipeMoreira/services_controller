import React from 'react';
import './styles.scss';
import { ServicesType } from '../../types/ServicesType';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

interface ModalProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export const Modalzinho = ({ open, setOpen }: ModalProps) => {
  const [data, setData] = React.useState<ServicesType>({
    name: '',
    lente: '',
    laboratorio: '',
    os: '',
  });

  async function submitData(serviceData: ServicesType) {
    try {
      const { data } = await axios.post(
        'https://localhost:8181/create',
        serviceData
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      show={open}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adicionar novo servico
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="form-modal" id="form-modal" method="post">
          <div className="field-modal">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={data?.name}
              className="input"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>

          <div className="field-modal">
            <label htmlFor="lente">Lente</label>
            <input
              type="text"
              name="lente"
              id="lente"
              value={data?.lente}
              onChange={(e) => setData({ ...data, lente: e.target.value })}
              className="input"
              required
            />
          </div>

          <div className="field-modal">
            <label htmlFor="laboratorio">Laboratorio</label>
            <select name="laboratorio" id="laboratorio" required>
              <option value="wave-pg">Wave pg</option>
              <option value="wave-sv">Wave sv</option>
            </select>
          </div>

          <div className="field-modal">
            <label htmlFor="numeroOs">Número de OS</label>
            <input
              type="text"
              name="os"
              id="numeroOs"
              value={data.os}
              required
              onChange={(e) => setData({ ...data, os: e.target.value })}
            />
          </div>

          <div className="field-modal">
            <label htmlFor="dataIda">Data de ida</label>
            <input type="date" name="dataIda" id="dataIda" required />
          </div>

          <div className="field-modal">
            <label htmlFor="dataEntrega">Data de entrega</label>
            <input type="date" name="dataEntrega" id="dataEntrega" required />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>

            <button
              className="btn-submit-modal"
              onClick={() => submitData(data)}
            >
              Adicionar
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};