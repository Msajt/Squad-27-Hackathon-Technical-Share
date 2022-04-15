//! Importando express
import express from 'express';
//! Importando controller
import { httpCreateNewMeeting, httpDeleteMeeting } from './meetings.controller';

//! Definindo router de reuniões
const meetingsRouter = express.Router();

//? Método POST - Criando reunião
    meetingsRouter.post('/:userId', httpCreateNewMeeting);
//? Método PATCH - Deletando reunião
    meetingsRouter.delete('/:meetingsId', httpDeleteMeeting);

//! Exportando router
export = meetingsRouter;
