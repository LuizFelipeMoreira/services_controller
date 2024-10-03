import React, { FormEvent, ChangeEvent } from 'react';
import './styles.scss';
import { ServicesType } from '../../@types/ServicesType';
import { Modal } from 'react-bootstrap';
import { CREATE_SERVICE } from '../../services/handleRequests';

interface ModalProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setServices: (arg: any) => void;
}

export const ModalService = ({ open, setOpen, setServices }: ModalProps) => {
  const initialServiceData = { nome: '', lente: '', laboratorio: '', os: '' };
  const [data, setData] = React.useState<ServicesType>(initialServiceData);
  const FormRef = React.useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const service = await CREATE_SERVICE(data);

      setOpen(false);
      addNewService(service);
      resetForm();
    } catch (error) {
      console.error('Erro ao cadastrar o servico:', error);
    }
  };

  const resetForm = () => {
    FormRef.current?.reset();
    setData({ nome: '', lente: '', laboratorio: '', os: '' });
  };

  const addNewService = (newService: ServicesType) => {
    if (!newService) return;
    setServices((oldServices: ServicesType[]) => [...oldServices, newService]);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

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

          <FormField label="Data de ida" type="date" name="dataIda" required />
          <FormField
            label="Data de entrega"
            type="date"
            name="dataEntrega"
            required
          />

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
