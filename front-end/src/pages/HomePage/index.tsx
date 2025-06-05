import React, { FormEvent } from 'react';
import { NewServiceModal } from '../../components/ModalNewService';
import { PaginationComponent } from '../../components/Pagitation';
import { Table } from '../../components/Table';
import { useService } from '../../hooks/useService';
import './styles.scss';

export const Home = () => {
  const { getServicesByName, getServicesPaginated } = useService();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [activePage, setActivePage] = React.useState(1);

  const submitForm = (e: FormEvent<HTMLButtonElement>) => {
    getServicesByName(name, 0);
    e.preventDefault();
    setActivePage(1);

    if (!name) getServicesPaginated(activePage, 10);

    getServicesByName(name, 0);
  };

  React.useEffect(() => {
    if (name) {
      getServicesByName(name, activePage);
    }
  }, [activePage]);

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
              onChange={(e) => setName(e.target.value)}
              placeholder="Pesquisar..."
            />
          </div>

          <div className="field">
            <label>Data de entrega: </label>
            <input type="date" name="dataEntrega" id="date" className="input" />
          </div>
          <button type="submit" onClick={submitForm} className="submit-btn">
            <i className="fa-solid fa-arrow-down-wide-short"></i>
          </button>
        </form>
      </div>

      <Table />

      <PaginationComponent
        searchQuery={name}
        setActivePage={setActivePage}
        activePage={activePage}
      />

      <NewServiceModal open={open} setOpen={setOpen} />
    </main>
  );
};
