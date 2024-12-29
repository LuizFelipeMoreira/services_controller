import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useService } from '../../hooks/useService';

interface DeleteServiceModalProps {
  modalConfirmShow: boolean;
  setModalConfirmShow: (_: boolean) => void;
}

export const DeleteServiceModal = ({
  modalConfirmShow,
  setModalConfirmShow,
}: DeleteServiceModalProps) => {
  const { deleteServiceList } = useService();

  return (
    <Modal show={modalConfirmShow}>
      <Modal.Header closeButton onHide={() => setModalConfirmShow(false)}>
        <Modal.Title>'Deseja editar esse serviço?'</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModalConfirmShow(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => deleteServiceList(5)}>
          Deletar Serviço
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
