//! Importando o express
import express from 'express';

//! Definindo os routers
    //? Router dos usuários
import usersRouter from './users/users.router';
    //? Router de auth
import authRouter from './auth/auth.router';
    //? Router de search
import searchRouter from './search/search.router';
    //? Router meetings
import meetingsRouter from './meetings/meetings.router';

//! Definindo router da API
const api = express.Router();

//? Gerenciamento dos routers
    //* Usuários
api.use('/users', usersRouter);
    //* Auth
api.use('/auth', authRouter);
    //* Busca
api.use('/search', searchRouter);
    //* Reuniões
api.use('/meetings', meetingsRouter);

//! Exportando api
export = api;