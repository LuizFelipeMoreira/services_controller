import React from 'react';
import './styles.scss';

import { ModalService } from '../Modal';

import { ServicesType } from '../../@types/ServicesType';
import { GET_SERVICES } from '../../api/api';
import { DELETE_SERVICE } from '../../api/api';

export const Main = () => {
  const [open, setOpen] = React.useState(false);
  const [services, setServices] = React.useState<ServicesType[]>([]);

  const handleDelete = async (id: number) => {
    console.log('servico com o id  ' + id + '  deletedo');

    //await DELETE_SERVICE(id);
  };

  const handleEditeService = async (id: number, data: string) => {
    console.log('funcao de editar' + id + data);
  };

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
              <tr className="service" key={service.id}>
                <td>{service.nome}</td>
                <td>{service.lente}</td>
                <td>{service.laboratorio}</td>
                <td>15/05/2024</td>
                <td>18/05/2024</td>
                <td>entregue</td>
                <td>{service.os}</td>

                <td className="d-flex gap-1">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => handleEditeService('data', 5)}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>

                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={() => handleDelete(service.id)}
                  >
                    <i className="fa-solid fa-trash delete-button"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ModalService open={open} setOpen={setOpen} setServices={setServices} />
    </main>
  );
};
