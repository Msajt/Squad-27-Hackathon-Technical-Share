import { remove, update } from 'firebase/database';
import { database, set, ref, get, child } from './database/firebase-connection';

async function createUser(name: string, userID: string, email: string, knowledges: Array<string>){
    const referencePath = `/users/${userID}/`;
	const userReference = ref(database, referencePath);

    await set(userReference, {
        name,
        email,
        knowledges,
        //meetings,
    });
}

async function getAllUsers(){
    let users: any;

    const referencePath = '/users/';
    const userReference = ref(database, referencePath);
    const snapshot = await get(userReference);

    if (snapshot.exists()) {
        users = snapshot.val();
        console.log(snapshot.val());
        console.log(users);
    } else {
        console.log("No data available");
    }

    return users;
}

async function updateUser(name: string, userID: string, email: string, knowledges: Array<string>){
    const referencePath = `/users/${userID}/`;
    const userReference = ref(database, referencePath);
    const snapshot = await get(userReference);
    
    let currentUserData: Object;
    
    (snapshot.exists()) ? currentUserData = snapshot.val() : console.log('Usuário não existe'); 
    
    let newUserData = {
        email: (email !== '') ? email : currentUserData['email'],
        knowledges: (knowledges !== []) ? knowledges : currentUserData['knowledges'],
        name: (name !== '') ? name : currentUserData['name'],
        meetings: currentUserData['meetings']
    }
    
    //TODO: como será tratado os dados que não serão alterados
    await update(userReference, newUserData);
}

async function deleteUser(id: string){
    const referencePath = '/users/'+id+'/';
    const userReference = ref(database, referencePath);

    await remove(userReference);
}

export {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
}