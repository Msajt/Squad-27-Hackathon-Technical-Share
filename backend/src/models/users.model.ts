import { remove, update } from 'firebase/database';
import { database, set, ref, get, child } from './database/firebase-connection';

async function createUser(name: string, username: string){
    const referencePath = '/users/'+username+'/';
	const userReference = ref(database, referencePath);

    await set(userReference, {
        name,
        created_at: new Date(),
    });
}

async function getAllUsers(){
    let users;

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

async function updateUser(name: string, username: string){
    const referencePath = '/users/'+username+'/';
    const userReference = ref(database, referencePath);

    //TODO: como será tratado os dados que não serão alterados
    await update(userReference, {
        name,
        created_at: new Date(),
    });
}

async function deleteUser(username: string){
    const referencePath = '/users/'+username+'/';
    const userReference = ref(database, referencePath);

    await remove(userReference);
}

export {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
}