import { Request, Response } from 'express';
import { checkUserAccessibility } from './../helpers/';

class UserController {
    static async getOneById(req: Request, res: Response): Promise<Response> {
        try {
            const user = await checkUserAccessibility({ req });
            return res.status(200).send({ data: user });
        } catch (error) {
            const { status, message } = error as ResponseError;
            if (status && message) return res.status(status).send(message);
            else return res.status(400).send('Bad request');
        }
    }
}

export default UserController;
