//! Importando HTTP, dotenv e app
import http from 'http';
import dotenv from 'dotenv';
    dotenv.config();
import app from './app'

const PORT = process.env.PORT || 3000;

//! Definindo o servidor
const server = http.createServer(app);

//? Função para inicializar o servidor
function startServer(){
    server.listen(PORT, () => {
        console.log(`Listening server on PORT ${PORT}`);
    })
}

//! Inicializando o servidor
startServer();