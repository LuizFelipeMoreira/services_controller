import React, { FormEvent } from 'react';
import './styles.scss';
import { ServicesType } from '../../@types/ServicesType';
import { Modal } from 'react-bootstrap';
import { CREATE_SERVICE } from '../../api/api';

interface ModalProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export const Modalzinho = ({ open, setOpen }: ModalProps) => {
  const [data, setData] = React.useState<ServicesType>({
    nome: '',
    lente: '',
    laboratorio: '',
    os: '',
  });
  const FormRef = React.useRef<HTMLFormElement>(null);

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const service = await CREATE_SERVICE(data);

      setOpen(false);
      FormRef.current?.reset();
      setData({ nome: '', lente: '', laboratorio: '', os: '' });

      return service;
    } catch (error) {
      console.error('Erro ao cadastrar o servico:', error);
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
        <form
          className="form-modal"
          id="form-modal"
          method="post"
          onSubmit={handleFormSubmit}
          ref={FormRef}
        >
          <div className="field-modal">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={data?.nome}
              className="input"
              onChange={(e) => setData({ ...data, nome: e.target.value })}
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
            <select
              name="laboratorio"
              id="laboratorio"
              onChange={(e) =>
                setData({ ...data, laboratorio: e.target.value })
              }
              required
            >
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

            <button className="btn-submit-modal">Adicionar</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
