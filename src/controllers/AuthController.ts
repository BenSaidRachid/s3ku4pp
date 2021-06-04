import { Request, Response } from 'express';
import {
    formatError,
    generateWebToken,
    hashPassword,
    isPasswordValid,
    validateEmail,
} from '../helpers';
import prisma from '../helpers/client';

class AuthController {
    static async register(req: Request, res: Response): Promise<Response> {
        const { firstname, lastname, email, password } = req.body;
        const fields: string[] = ['firstname', 'lastname', 'email', 'password'];
        const missingValues = fields.filter(key => !(key in req.body));
        try {
            if (missingValues.length > 0)
                throw formatError(400, `${missingValues.join(', ')} are missing`);
            if (!validateEmail(email)) throw formatError(400, 'Invalid email provided');

            const user = await prisma.user.create({
                data: {
                    firstname,
                    lastname,
                    email,
                    password: hashPassword(password),
                },
            });
            const token = generateWebToken({ id: user.id, email: user.email });

            return res.status(200).send({
                token,
                data: user,
            });
        } catch (error) {
            const { status, message } = error as ResponseError;
            if (status && message) return res.status(status).send(message);
            else return res.status(409).send('Email already used');
        }
    }

    static async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const fields: string[] = ['email', 'password'];
        const missingValues = fields.filter(key => !(key in req.body));

        try {
            if (missingValues.length > 0)
                throw formatError(400, `${missingValues.join(', ')} are missing`);
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) throw formatError(404, 'User not found');

            if (!isPasswordValid(password, user.password)) {
                throw formatError(401, 'Email or password invalid');
            }

            const token = generateWebToken({ id: user.id, email: user.email });

            return res.send({ token, data: user });
        } catch (error) {
            const { status, message } = error as ResponseError;
            if (status && message) return res.status(status).send(message);
            else return res.status(404).send('User not found');
        }
    }
}

export default AuthController;
