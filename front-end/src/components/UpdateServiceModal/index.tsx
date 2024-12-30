import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IService } from '../../@types/IService';
import { useService } from '../../hooks/useService';
import { FormField, FormSelect } from '../NewServiceModal';

interface UpdateModalProps {
  modalConfirmShow: boolean;
  setModalConfirmShow: (_: boolean) => void;
}

export const UpdateServiceModal = ({
  modalConfirmShow,
  setModalConfirmShow,
}: UpdateModalProps) => {
  const [data, setData] = React.useState({} as IService);
  const { updateService } = useService();
  const FormRef = React.useRef<HTMLFormElement>(null);

  // const handleClose = () => {
  //   //resetForm();
  //   setModalConfirmShow(false);
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={modalConfirmShow}>
      <Modal.Header closeButton onHide={() => setModalConfirmShow(false)}>
        <Modal.Title>'Deseja editar esse serviço?'</Modal.Title>
      </Modal.Header>

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
          <FormField label="Data de ida" type="date" name="dataIda" required />
          <FormField
            label="Data de entrega"
            type="date"
            name="dataEntrega"
            required
          />
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModalConfirmShow(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => updateService(data)}>
          Salvar mudanças
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
