import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { createUser } from './users.model';
const auth = getAuth();

//! Criando um novo usuário no 'auth'
async function createUserAuth(name: string, email: string, password: string, knowledges: Array<string>) : Promise<boolean>{
    let success = false;
    
    await createUserWithEmailAndPassword(auth, email, password)
        .then(
            async (userCredential) => {
                const { user } = userCredential;
                console.log(`email: ${user.email}\nuid: ${user.uid}`);

                const { uid, email } = user; 
                await createUser(name, uid, email, knowledges);

                success = true;
            }
        )
        .catch(error => {
            const { code, message } = error;
            console.log(`Houve um erro ${code}:\n${message}`);
        })

        return success;
    //TODO -> enviar para a página de login
}

//! Fazendo o login do usuário
async function signInUserAuth(email: string, password: string): Promise<JSON>{
    let response;

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const { user } = userCredential;
            console.log(`${user.email} logou com sucesso`)

            response = user;
        })
        .catch((error) => {
            const { code, message } = error;

            response = {code, message};
            console.log(`Houve um erro ${code}:\n${message}`);
        })
        
    return response;
    //TODO -> enviar para o dashboard
}

//! Fazendo o logout do usuário
async function signOutUserAuth(): Promise<boolean>{
    let success = false;

    await signOut(auth)
        .then(() => {
            console.log(`O usuário se deslogou com sucesso`);
            success = true;
        })
        .catch((error) => {
            const { code, message } = error;
            console.log(`Houve um erro ${code}:\n${message}`);
        })

    return success;
    //TODO -> enviar para a página de login
}

//! Verificando se usuário está logado
async function verifyUserLogin(): Promise<boolean>{
    const user = auth.currentUser;
    let success = false;

    (user) ? success = true : null;

    return success;
}

export {
    createUserAuth,
    signInUserAuth,
    signOutUserAuth,
    verifyUserLogin
}