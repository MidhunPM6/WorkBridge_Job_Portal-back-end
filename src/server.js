import dotenv from 'dotenv';
dotenv.config();
import { app } from './app.js';
import http from "http";
import { create } from 'domain';
import { createSocketServer } from './infrastructure/socket-config/socketServer.js';


const httpServer = http.createServer(app);
const port = process.env.PORT || 8080;

createSocketServer(httpServer);
 
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
       