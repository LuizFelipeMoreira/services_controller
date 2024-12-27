import cors from 'cors';
import express from 'express';
import path from 'path';
import serviceRoutes from './controllers/service/services.routes';
import authenticateRoutes from './controllers/authenticate/authenticate.routes';

const app = express();
const PORT = 8181;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('./src/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(serviceRoutes);
app.use(authenticateRoutes);

app.listen(PORT, () => {
    console.log('Servidor iniciado com sucesso na porta ' + PORT);
});
