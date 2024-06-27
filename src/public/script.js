document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-modal');

  if (form !== null) {
    form.addEventListener('submit', handleFormSubmit);
  }
});

async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const formDataObject = Object.fromEntries(formData.entries());

  try {
    await submitFormData('/create', formDataObject);

    console.log(formDataObject);

    console.log('tentou uma promise');

    addNewServiceRow(formDataObject);
    hideModal('staticBackdrop');
    this.reset();
  } catch (error) {
    // throw new Error(error);
  }
}

function addNewServiceRow(data) {
  const serviceList = document.querySelector('.service-list');
  const newService = document.createElement('tr');

  newService.classList.add('service');
  newService.id = data.id;
  newService.innerHTML = `
    <td>${data.nome}</td>
    <td>${data.lente}</td>
    <td> ${data.laboratorio}</td>
    <td>15/05/2024</td>
    <td>18/05/2024</td>
    <td>entregue</td>
    <td>${data.os}</td>
    <td class="d-flex gap-1">
      <form action="/edit/<%= service.id %>" method="post">
          <button type="" class="btn btn-primary"><i class="fa-solid fa-pen"></i></button>
      </form>

      <form action="/delete/<%= service.id %>" class="form-delete" method="post">
          <button type="submit" class="btn btn-danger"><i class="fa-solid fa-trash delete-button"></i></button>
      </form>
    </td>
  `;

  serviceList?.appendChild(newService);
}

async function submitFormData(url, data) {
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

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  const modalInstance = bootstrap.Modal.getInstance(modal);
  modalInstance.hide();
}
