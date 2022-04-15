import { database, set, ref, get, child } from './database/firebase-connection';

async function searchUserByName(name: string): Promise<string[]>{
    const databaseRef = ref(database);
    let userInformationsArray = new Array();
    
    await get(child(databaseRef, 'users'))
        .then(snapshot => {
            //? Coletando o objeto que contém os dados dos usuários
            const userIDsObject = snapshot.val();
            //? Transformando o objeto em array
            const userIDsArray = Object.entries(userIDsObject);
            //? Pegando apenas os dados de cada usuário
            userIDsArray.forEach(user => userInformationsArray.push(user[1]));
        });
    
    const userFound = userInformationsArray.filter(user => String(user.name).includes(name));

    if(userFound !== undefined) return userFound;
    else return [];
}

async function searchUsersByKnowledges(knowledges: Array<string>): Promise<string[]>{
    const databaseRef = ref(database);
    let userInformationsArray = new Array();
    
    await get(child(databaseRef, 'users'))
        .then(snapshot => {
            //? Coletando o objeto que contém os dados dos usuários
            const userIDsObject = snapshot.val();
            //? Transformando o objeto em array
            const userIDsArray = Object.entries(userIDsObject);
            //? Pegando apenas os dados de cada usuário
            userIDsArray.forEach(user => userInformationsArray.push(user[1]));
        });

    let usersFound = [];

    for (let i=0; i < userInformationsArray.length; i++){
        if(userInformationsArray[i].knowledges.some(knowledge => knowledges.includes(knowledge))){
            usersFound.push(userInformationsArray[i]);
        }
    }

    //console.log(knowledges);
    if(usersFound !== undefined) return usersFound;
    else return [];
}

async function searchMeetings(): Promise<string[]>{
    const databaseRef = ref(database);
    let meetingsInformationsArray = new Array();
    
    await get(child(databaseRef, 'meetings'))
        .then(snapshot => {
            //? Coletando o objeto que contém os dados dos usuários
            const meetingsIDsObject = snapshot.val();
            //? Transformando o objeto em array
            const meetingsIDsArray = Object.entries(meetingsIDsObject);
            //? Pegando apenas os dados de cada usuário
            meetingsIDsArray.forEach(meetings => meetingsInformationsArray.push(meetings[1]));
        });
    
    if(meetingsInformationsArray !== undefined) return meetingsInformationsArray;
    else return [];
}

async function searchMeetingsById(meetingsId: string): Promise<string[]>{
    const databaseRef = ref(database);
    let meetingsInformationsArray = new Array();
    
    await get(child(databaseRef, 'meetings'))
        .then(snapshot => {
            //? Coletando o objeto que contém os dados dos usuários
            const meetingsIDsObject = snapshot.val();
            //? Transformando o objeto em array
            const meetingsIDsArray = Object.entries(meetingsIDsObject);
            //? Pegando apenas os dados de cada usuário
            meetingsIDsArray.forEach(meetings => meetingsInformationsArray.push(meetings[1]));
        });
    
    const meetingsFound = meetingsInformationsArray.find(meetings => String(meetings.meetingId) === meetingsId);

    if(meetingsFound !== undefined) return meetingsFound;
    else return [];
}

export {
    searchUserByName,
    searchUsersByKnowledges,
    searchMeetings,
    searchMeetingsById,
}