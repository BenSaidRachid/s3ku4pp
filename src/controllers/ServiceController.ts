import { Request, Response } from 'express';
import { checkUserAccessibility, formatError, generateWebToken } from './../helpers/';

class ServiceController {
    static async getApiToken(req: Request, res: Response): Promise<Response> {
        try {
            const user = await checkUserAccessibility({ req });
            if (!user) throw formatError(404, 'User not found');
            const token = generateWebToken({ id: user.id, email: user.email });
            return res.status(200).send({ token });
        } catch (error) {
            const { status, message } = error as ResponseError;
            if (status && message) return res.status(status).send(message);
            else return res.status(404).send('User not found');
        }
    }
}

export default ServiceController;
