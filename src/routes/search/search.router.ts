//! Importando o express
import express from 'express';
//! Importando o controller
import { httpSearchUserByName,
         httpSearchUsersByKnowledges,
         httpSearchMeetings,
         httpSearchMeetingsById 
        } from './search.controller';

//! Definindo o router de pesquisas
const searchRouter = express.Router();

//? Método GET - Busca por usuário
    searchRouter.get('/name', httpSearchUserByName);
//? Método GET - Busca por conhecimentos
    searchRouter.get('/knowledges', httpSearchUsersByKnowledges);
//? Método GET - Busca por todas reuniões
    searchRouter.get('/meetings', httpSearchMeetings);
//? Método GET - Busca por todas reuniões
    searchRouter.get('/meetings/:meetingsId', httpSearchMeetingsById);

//! Exportando router
export = searchRouter;