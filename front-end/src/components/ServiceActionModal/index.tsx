import React, { useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FormField, FormSelect } from '../NewServiceModal';
import { ServicesType } from '../../@types/ServicesType';
import { useService } from '../../hooks/useService';

type ModalType = 'edit' | 'delete';

interface ModalConfirmProps {
  type: ModalType;
  modalConfirmShow: boolean;
  service: ServicesType;
  setModalConfirmShow: (arg: boolean) => void;
}

export const ServiceActionModal = ({
  type,
  setModalConfirmShow,
  modalConfirmShow,
  service,
}: ModalConfirmProps) => {
  const [serviceData, setServiceData] = React.useState<ServicesType>(service);
  const { deleteServiceList, updateService } = useService();
  const FormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setServiceData(service);
  }, [service]);

  const submitModal = async () => {
    console.log(serviceData);

    switch (type) {
      case 'edit':
        if (serviceData.id) updateService(serviceData);
        resetForm();

        break;
      case 'delete':
        if (serviceData.id) deleteServiceList(serviceData.id);

        break;
      default:
    }

    setModalConfirmShow(false);
  };

  const resetForm = () => {
    setServiceData({ nome: '', lente: '', laboratorio: '', os: '' });
    FormRef.current?.reset();
  };

  const handleClose = () => {
    resetForm();
    setModalConfirmShow(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
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
              value={serviceData.nome}
              onChange={handleChange}
              required
            />
            <FormField
              label="Lente"
              type="text"
              name="lente"
              value={serviceData.lente}
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
              value={serviceData.laboratorio}
              onChange={handleChange}
              required
            />
            <FormField
              label="Número de OS"
              type="text"
              name="os"
              value={serviceData.os}
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

        <Button variant="primary" onClick={() => submitModal()}>
          Salvar mudanças
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
