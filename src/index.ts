import { config } from './config';
import { TodoServer } from './Server';

const server: TodoServer = new TodoServer(config.port);
server.start();
