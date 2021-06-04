import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import './middlewares/passport';
import passport from 'passport';
import routes from './routes';
import { info, success } from './helpers/log';

export default class Server {
    private _host: string;
    private _port: number;
    private _app: Express | null = null;

    public constructor(host: string, port: number) {
        this._host = host;
        this._port = port;
    }

    private async _initialize(): Promise<void> {
        success('Database successfully authenticated');
        this._app = express();
        this._app.use(cors());
        this._app.use(helmet());
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(passport.initialize());
        this._app.use('/', routes);
    }

    public async run(): Promise<void> {
        await this._initialize();

        if (this._app)
            this._app.listen(this._port, () => {
                info(`Server is listening on ${this._host}:${this._port}`);
            });
    }
}
