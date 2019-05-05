import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';

import { StatusController, TasksController } from './controllers';

export class TodoServer extends Server {
    private port: number = 3000;

    constructor(port: number) {
        super();
        this.port = port;

        this.expressSetup();
        this.controllersSetup();
    }

    private expressSetup() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    private controllersSetup() {
        const statusController: StatusController = new StatusController();
        const tasksController: TasksController = new TasksController();

        this.addControllers([ statusController, tasksController ]);
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log('Server listening on port: ' + this.port);
        });
    }
}
