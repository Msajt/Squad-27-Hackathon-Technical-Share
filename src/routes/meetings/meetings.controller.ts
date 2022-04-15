//! Importar 'Request' e 'Response'
import { Request, Response } from "express";
//! Importar model de 'meetings'
import { createNewMeeting, deleteMeeting } from '../../models/meetings.model';
//! Importar search de meeting por id
import { searchMeetingsById } from '../../models/search.model';

//? Método POST - criando nova reunião
async function httpCreateNewMeeting(request: Request, response: Response){
    const { guestName, subject, date } = request.body;
    const { userId } = request.params;

    //* Criando nova reunião
        //TODO Fazer alguma forma de retornar algum tipo de sucesso/erro
    await createNewMeeting(userId, guestName, subject, date);

    //* Retornar response ao usuário
    return response.status(200).json({
        guestName,
        subject,
        date,
        userId,
    })
}

//? Método DELETE - deletando reunião
async function httpDeleteMeeting(request: Request, response: Response){
    const { meetingsId } = request.params;

    const meeting = await searchMeetingsById(meetingsId);
    const userId = meeting['userId'];
    const guestId = meeting['guestId'];

    //TODO: Procurar o userId e guestId e não receber pelo body 

    //* Deletando a reunião
        //TODO Fazer alguma forma de retornar algum tipo de sucesso/erro
    await deleteMeeting(meetingsId, userId, guestId);

    //* Retornar response ao usuário
    return response.status(200).json({
        message: `A reunião ${meetingsId} foi removida e os dados dos usuários atualizados`
    });
}

export {
    httpCreateNewMeeting,
    httpDeleteMeeting,
}