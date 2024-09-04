import React from 'react';
import './styles.scss';
import { Modalzinho } from '../Modal';

export const Main = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <main className="main">
      <div className="wrapper">
        <h4 className="fw-bold">Lista de Serviços</h4>
        <button
          type="button"
          className="btn-new-service"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
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

      <Modalzinho open={open} setOpen={setOpen} />
    </main>
  );
};
