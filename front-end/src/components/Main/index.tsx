import React from 'react';
import './styles.scss';

import { Modalzinho } from '../Modal';

import { ServicesType } from '../../types/ServicesType';
import { GET_SERVICES } from '../../api/api';

export const Main = () => {
  const [open, setOpen] = React.useState(false);
  const [services, setServices] = React.useState<ServicesType[]>([]);

  React.useEffect(() => {
    GET_SERVICES().then((data) => {
      setServices(data);
    });

    console.log(services);
  }, []);

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

      <table className="tabelinha">
        <caption>List of users</caption>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Lente</th>
            <th>Lab</th>
            <th>Ida</th>
            <th>Volta</th>
            <th>Situacao</th>
            <th>OS</th>
            <th></th>
          </tr>
        </thead>

        <tbody className="service-list">
          {services &&
            services.map((service) => (
              <tr className="service" id="">
                <td>{service.nome}</td>
                <td>{service.lente}</td>
                <td>{service.laboratorio}</td>
                <td>15/05/2024</td>
                <td>18/05/2024</td>
                <td>entregue</td>
                <td>{service.os}</td>

                <td className="d-flex gap-1">
                  <form action="/edit/<%= service.id %>" method="post">
                    <input type="hidden" name="id" value="" />
                    <button type="submit" className="btn btn-primary">
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </form>

                  <form
                    action="/delete/<%= service.id %>"
                    className="form-delete"
                    method="post"
                  >
                    <input type="hidden" name="id" value="" />
                    <button type="submit" className="btn btn-danger">
                      <i className="fa-solid fa-trash delete-button"></i>
                    </button>
                  </form>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modalzinho open={open} setOpen={setOpen} />
    </main>
  );
};
