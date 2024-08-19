import React from 'react';
import './styles.scss';

export const Modal = () => {
  return (
    <div>
      <div
        className="modal fade modal-d"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Adicionar novo servico
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                action="/create"
                className="form-modal"
                id="form-modal"
                method="post"
              >
                <div className="field-modal">
                  <label for="nome">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    className="input"
                    required
                  />
                </div>

                <div className="field-modal">
                  <label for="lente">Lente</label>
                  <input
                    type="text"
                    name="lente"
                    id="lente"
                    className="input"
                    required
                  />
                </div>

                <div className="field-modal">
                  <label for="laboratorio">Laboratorio</label>
                  <select name="laboratorio" id="laboratorio" required>
                    <option value="wave-pg">Wave pg</option>
                    <option value="wave-sv">Wave sv</option>
                  </select>
                </div>

                <div className="field-modal">
                  <label for="numeroOs">Número de OS</label>
                  <input type="text" name="os" id="numeroOs" required />
                </div>

                <div className="field-modal">
                  <label for="dataIda">Data de ida</label>
                  <input type="date" name="dataIda" id="dataIda" required />
                </div>

                <div className="field-modal">
                  <label for="dataEntrega">Data de entrega</label>
                  <input
                    type="date"
                    name="dataEntrega"
                    id="dataEntrega"
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-submit-modal">
                    Adicionar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
