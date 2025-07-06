import React, { ChangeEvent, FormEvent } from 'react';
import { Modal } from 'react-bootstrap';
import { IServiceResquest } from '../../@types/IService';
import { useService } from '../../hooks/useService';
import './styles.scss';

interface ModalProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export const NewServiceModal = ({ open, setOpen }: ModalProps) => {
  const [data, setData] = React.useState({} as IServiceResquest);
  const FormRef = React.useRef<HTMLFormElement>(null);
  const { addNewService } = useService();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(data);

    try {
      addNewService(data);
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error('Erro ao cadastrar o servico:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    FormRef.current?.reset();
    setData({
      nome: '',
      lente: '',
      laboratorio: '',
      os: '',
      situacao: 'pendente',
      dataIda: '',
      dataEntrega: '',
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleInputDateChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const [ano, mes, dia] = value.split('-');
    const dateFormated = `${dia}/${mes}`;

    setData({ ...data, [name]: dateFormated });
    console.log(ano);
  };

  return (
    <Modal
      show={open}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={() => setOpen(false)}>
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
          <FormField
            label="Nome"
            type="text"
            name="nome"
            value={data.nome}
            onChange={handleInputChange}
            required
          />

          <FormField
            label="Lente"
            type="text"
            name="lente"
            value={data.lente}
            onChange={handleInputChange}
            required
          />

          <FormSelect
            label="Laboratório"
            name="laboratorio"
            options={[
              { value: 'wave-pg', label: 'Wave pg' },
              { value: 'wave-sv', label: 'Wave sv' },
            ]}
            onChange={handleInputChange}
            required
          />

          <FormField
            label="Número de OS"
            type="text"
            name="os"
            value={data.os}
            onChange={handleInputChange}
            required
          />

          <FormField
            label="Data de ida"
            type="date"
            name="dataIda"
            onChange={handleInputDateChange}
            required
          />

          <FormField
            label="Data de entrega"
            type="date"
            name="dataEntrega"
            onChange={handleInputDateChange}
            required
          />

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => handleClose()}
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

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const FormField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
}: FormFieldProps) => {
  return (
    <div className="field-modal">
      <label htmlFor="numeroOs">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        required
        onChange={onChange}
      />
    </div>
  );
};

interface FormSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

export const FormSelect = ({
  label,
  name,
  options,
  onChange,
  required,
}: FormSelectProps) => (
  <div className="field-modal">
    <label htmlFor={name}>{label}</label>
    <select
      name={name}
      id={name}
      onChange={onChange}
      required={required}
      className="input"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
