//! Importando o express
import express from 'express';

//! Importando o controller
import { httpGetAllUsers, httpUpdateUser, httpCreateUser, httpDeleteUser } from './users.controller';

//! Definindo o router dos usuários
const usersRouter = express.Router();

//? Método GET
    usersRouter.get('/', httpGetAllUsers);
//? Método POST
    usersRouter.post('/', httpCreateUser);
//? Método PUT
    usersRouter.put('/:id', httpUpdateUser);
//? Método DELETE
    usersRouter.delete('/:id', httpDeleteUser);

//! Exportando o router dos usuários
export = usersRouter;

