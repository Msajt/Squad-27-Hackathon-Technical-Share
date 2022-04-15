//! Importar funções do Firebase para criação de collection de meetings
import { update, push, remove } from 'firebase/database';
import { database, set, ref, get, child } from './database/firebase-connection';

//! Criando uma nova reunião
async function createNewMeeting(userId: string, guestName: string, subject: string, date: Date){
    //? Coletando os dados do usuário convidado
    let userInformationArray = await searchUserDataByName(guestName);
    //console.log(userInformationArray);

    //? Definir a collection 'meetings'
        //* meeting_id -> generated key
        //* uid_user   -> string
        //* uid_guest  -> string
        //* subject    -> string
        //* date       -> Date()
    
    //? Definindo a ID da reunião
    let meetingId = push(child(ref(database), 'meetings')).key;

    //? Definindo a collection de 'meetings'
    const referencePath = `meetings/${meetingId}`;
    const meetingReference = ref(database, referencePath);
    
    await set(meetingReference, {
        meetingId,
        userId,
        guestId: userInformationArray[0],
        subject,
        date,
    });

    //? Fazendo o update dos dados das reuniões em 'users'
        //* meetings {
        //*    meetingId: { type: 'host'/'guest'}
        //* }
    await updateUsersCollectionMeeting(userId, meetingId, 'host');
    await updateUsersCollectionMeeting(userInformationArray[0], meetingId, 'guest');
}

    //? Funções auxiliares da criação de reunião
    async function updateUsersCollectionMeeting(userId: string, meetingId: string, userType: string){
        const refUserPath = `users/${userId}/meetings/${meetingId}`;
        const userRef = ref(database, refUserPath);

        await update(userRef, {
            type: userType
        });
    }

    async function searchUserDataByName(name: string): Promise<any[]>{
        //? Coletar o id do convidado a partir do nome
        const databaseRef = ref(database);
        let userInformationArray = new Array();
    
        await get(child(databaseRef, 'users'))
            .then(snapshot => {
                //? Coletando o objeto que contém os dados dos usuários
                const userIDsObject = snapshot.val();
                //? Transformando o objeto em array
                const userIDsArray = Object.entries(userIDsObject);
                //? Pegando apenas os dado do usuário chamado
                    //* Retorno -> [ guestId, { guestData } ]
                userInformationArray = userIDsArray.find(user => user[1]['name'] === name);
            });
        
        return userInformationArray;
    }

//! Deletando uma reunião
async function deleteMeeting(meetingId: string, userId: string, guestId: string){
    const referencePath = `meetings/${meetingId}/`;
    const meetingsReference = ref(database, referencePath);

    //? Deletando reunião
    await remove(meetingsReference);

    //? Deletando reunião de users
    await deleteUsersCollectionMeeting(meetingId, userId);
    await deleteUsersCollectionMeeting(meetingId, guestId);
}

    //? Função auxiliar da remoção de reunião
    async function deleteUsersCollectionMeeting(meetingId: string, userId: string){
        const refUserPath = `users/${userId}/meetings/${meetingId}`;
        const userRef = ref(database, refUserPath);

        await remove(userRef);
    }



//! Exportar as funções
export {
    createNewMeeting,
    deleteMeeting,
}