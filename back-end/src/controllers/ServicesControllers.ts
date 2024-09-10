import { Request, Response } from 'express';
import { Servicos } from '../models/Services';

export const GetAllServices = async (req: Request, res: Response) => {
  const services = await Servicos.findAll({ raw: true });

  // console.log(services);

  res.status(200).json(services);
};

export const CreateNewService = async (req: Request, res: Response) => {
  const { nome, lente, laboratorio, dataIda, dataEntrega, os } = req.body;

  try {
    const serviceDb = await Servicos.create({ nome, lente, laboratorio, os });
    console.log(serviceDb);

    //res.redirect('/');
    res.status(200).json(serviceDb);
  } catch (error) {
    console.log('foi p catch');
    res.send(`<h1>Erro ao adicionar servico: ${error}</h1>`);
  }
};

export const EditService = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await Servicos.destroy({ where: { id } });

    res.redirect('/');
  } catch (error) {
    res.send(error);
    console.error(error);
  }
};

export const DeleteService = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await Servicos.destroy({ where: { id } });

    res.redirect('/');
  } catch (error) {
    res.send(error);
    console.error(error);
  }
};
