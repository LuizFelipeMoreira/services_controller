export interface ServiceType {
  id: number;
  nome: string;
  lente: string;
  laboratorio: string;
  os: string;
  createdAt: Date;
  updatedAt: Date;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-modal');

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});

async function handleFormSubmit(this: HTMLFormElement, event: Event) {
  event.preventDefault();

  console.log(event.target);

  const formData = new FormData(this);
  const formDataObject: ServiceType = Object.fromEntries(formData.entries());

  console.log(formDataObject);

  try {
    await submitFormData('/create', formDataObject);
    addNewServiceRow(formDataObject);
    hideModal('staticBackdrop', this);
    this.reset();
  } catch (error: any) {
    throw new Error(error);
  }
}

function addNewServiceRow(data: ServiceType) {
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

  serviceList?.appendChild(newService);
}

async function submitFormData(url: string, data: ServiceType) {
  const response = await fetch(url, {
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
}

function hideModal(modalId: string, form?: HTMLFormElement) {
  const modal = document.getElementById(modalId);
  const modalInstance = bootstrap?.Modal.getInstance(modal);

  form?.reset();
  modalInstance.hide();
}
