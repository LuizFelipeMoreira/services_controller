import { Request, Response } from 'express';
import { Services } from '../models/Services';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { nome, lente, laboratorio, dataIda, dataEntrega, os } = req.body;

  try {
    const serviceDb = await Services.create({ nome, lente, laboratorio, os });

    // res.json(serviceDb);
    res.status(200);
    // res.send(`
    // <h1>Servico Criado</h1>
    // <hr/>
    // <h4>Nome do servico: ${nome}</h4>
    // <h4>Lente: ${lente}</h4>
    // <h4>Laboratorio: ${laboratorio}</h4>
    // <h4>Os: ${os}</h4>
    // <h4>Data de ida: ${dataIda}</h4>
    // <h4>Data de volta: ${dataEntrega}</h4>
    // `);
  } catch (error) {
    res.send(`<h1>Erro ao adicionar servico:<h1/>
    <p>${error}</p>`);
  }
};

// Edit an existing user
export const editUser = async (req: Request, res: Response) => {};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {};
