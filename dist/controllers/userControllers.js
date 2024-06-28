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
exports.deleteUser = exports.editUser = exports.createUser = void 0;
const Services_1 = require("../models/Services");
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, lente, laboratorio, dataIda, dataEntrega, os } = req.body;
    try {
        const serviceDb = yield Services_1.Services.create({ nome, lente, laboratorio, os });
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
    }
    catch (error) {
        res.send(`<h1>Erro ao adicionar servico:<h1/>
    <p>${error}</p>`);
    }
});
exports.createUser = createUser;
// Edit an existing user
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.editUser = editUser;
// Delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteUser = deleteUser;
