import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as CommonController from '../controllers/common.controller';

class Common {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.CommonRouter();
    }

    private CommonRouter(): void {
        // @Route GET /common/status
        // @DESC check status of the server and database
        // @ACCESS PUBLIC
        this.router.get('/status', CommonController.checkStatus);
    }
}

export const CommonApi = new Common().router;
