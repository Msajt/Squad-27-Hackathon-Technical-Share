//! Importando o express
import express from 'express';
//! Importando o controller
import { httpSignInUser, httpSignOutUser, httpVerifyUserLogin } from './auth.controller'

//! Definindo o router de auth
const authRouter = express.Router();

//? Método PUT - Login de usuário
    authRouter.put('/login', httpSignInUser);
//? Método GET - Logout de usuário
    authRouter.get('/logout', httpSignOutUser);
//? Método GET - Verificando se usuário está logado
    authRouter.get('/verify', httpVerifyUserLogin);

//! Exportando router
export = authRouter;

