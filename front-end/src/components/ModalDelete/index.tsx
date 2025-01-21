import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useService } from '../../hooks/useService';

interface DeleteServiceModalProps {
  id: number;
  modalConfirmShow: boolean;
  setModalConfirmShow: (_: boolean) => void;
}

export const DeleteServiceModal = ({
  id,
  modalConfirmShow,
  setModalConfirmShow,
}: DeleteServiceModalProps) => {
  const { deleteService } = useService();

  const hanldeDelete = () => {
    deleteService(id);
    setModalConfirmShow(false);
  };

  return (
    <Modal show={modalConfirmShow}>
      <Modal.Header closeButton onHide={() => setModalConfirmShow(false)}>
        <Modal.Title>'Deseja editar esse serviço?'</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModalConfirmShow(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => hanldeDelete()}>
          Deletar Serviço
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
