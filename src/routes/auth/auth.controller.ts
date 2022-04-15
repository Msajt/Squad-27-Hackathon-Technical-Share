import { Request, Response } from "express";
import { signInUserAuth, signOutUserAuth, verifyUserLogin } from "../../models/auth.model";

async function httpSignInUser(request: Request, response: Response){
    const { email, password } = request.body
    const statusResponse = await signInUserAuth(email, password);

    console.log(statusResponse);

    //? Tratamento de erros
    switch(statusResponse['code']){
        case 'auth/invalid-email':
            return response.status(400).json({error: "Email inválido"});
        case 'auth/wrong-password':
            return response.status(401).json({error: "Senha errada"});
        case 'auth/user-not-found':
            return response.status(404).json({error: "Usuário não encontrado"});
    }

    //? Retornando status 200 - SUCCESS ou 400 - BAD REQUEST
    if(statusResponse['uid']) {
        //TODO: Enviar para o dashboard
        // Ir para dashboard
        return response.status(200).send({data: {uid: statusResponse['uid']}});
    } else return response.status(400).send();
}

async function httpSignOutUser(request: Request, response: Response){
    const statusResponse = await signOutUserAuth();

    //? Retornando status 200 - SUCCESS ou 400 - BAD REQUEST
    if(statusResponse){
        //TODO: Enviar para a página de login
        // Ir para página de login
        return response.status(201).send();
    }
    else return response.status(400).send();
}

async function httpVerifyUserLogin(request: Request, response: Response){
    const statusResponse = await verifyUserLogin()

    if(statusResponse) return response.status(200).json({ message: 'O usuário está logado' });
    else return response.status(401).json({ error: 'Usuário não está logado, retornando para a página principal' })
}

export {
    httpSignInUser,
    httpSignOutUser,
    httpVerifyUserLogin
}