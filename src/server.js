import express from 'express';

const server = express();

// Import das rotas
import routerUsers from './routes/users.routes.js';
import routerSkins from './routes/skins.routes.js';
import routerFavorites from './routes/fav.routes.js';
import routerMyJobs from './routes/myjobs.routes.js';

// Define a porta
const PORT = 3000;

// Middlewares
server.use(express.json());

// Prefixo /api para todas as rotas
server.use("/api", routerUsers);
server.use("/api", routerSkins);
server.use("/api", routerFavorites);
server.use("/api", routerMyJobs);

// Rota base só pra testar
server.get("/", (req, res) => {
    res.send(`API funcionando - ${new Date().toLocaleString()}`);
});

// Inicia o servidor
server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
