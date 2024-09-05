import React from 'react';
import './styles.scss';

export const Table = () => {
  return (
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
        <tr className="service" id="<%= service.id %>">
          <td>Luizinho</td>
          <td>Multifocal com coloracaao</td>
          <td>wave</td>
          <td>15/05/2024</td>
          <td>18/05/2024</td>
          <td>entregue</td>
          <td></td>
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
      </tbody>
    </table>
  );
};
