"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-modal');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});
function handleFormSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        console.log(event.target);
        const formData = new FormData(this);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
        try {
            yield submitFormData('/create', formDataObject);
            addNewServiceRow(formDataObject);
            hideModal('staticBackdrop', this);
            this.reset();
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function addNewServiceRow(data) {
    const serviceList = document.querySelector('.service-list');
    const newService = document.createElement('tr');
    newService.classList.add('service');
    newService.innerHTML = `
    <td>${data.nome}</td>
    <td>${data.lente}</td>
    <td> ${data.laboratorio}</td>
    <td>15/05/2024</td>
    <td>18/05/2024</td>
    <td>entregue</td>
    <td>${data.os}</td>
    <td>
        <button class="btn btn-primary"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
    </td>
  `;
    serviceList === null || serviceList === void 0 ? void 0 : serviceList.appendChild(newService);
}
function submitFormData(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Erro ao fazer request');
        }
        return response.json();
    });
}
function hideModal(modalId, form) {
    const modal = document.getElementById(modalId);
    const modalInstance = bootstrap === null || bootstrap === void 0 ? void 0 : bootstrap.Modal.getInstance(modal);
    form === null || form === void 0 ? void 0 : form.reset();
    modalInstance.hide();
}
