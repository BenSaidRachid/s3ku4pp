import { Request, Response } from 'express';
import { formatError, checkUserAccessibility, stringEqualTrue, stringEqualFalse } from '../helpers';
import prisma from '../helpers/client';

class TaskController {
    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const user = await checkUserAccessibility({ req });
            const tasks = await prisma.task.findMany({
                where: {
                    userId: (user as User).id,
                },
            });
            return res.status(200).send({
                data: tasks,
            });
        } catch (error) {
            const { status, message } = error as ResponseError;
            if (status && message) return res.status(status).send(message);
            else return res.status(404).send('User not found');
        }
    }

    static async create(req: Request, res: Response): Promise<Response> {
        const { content } = req.body;
        const fields: string[] = ['content'];
        const missingValues = fields.filter(key => !(key in req.body));
        try {
            if (missingValues.length > 0)
                throw formatError(400, `${missingValues.join(', ')} are missing`);
            const user = await checkUserAccessibility({ req });

            const task = await prisma.task.create({
                data: {
                    content,
                    userId: (user as User).id,
                },
            });
            return res.status(200).send({
                data: task,
            });
        } catch (error) {
            const { status, message } = error as ResponseError;
            if (status && message) return res.status(status).send(message);
            else return res.status(409).send('Email already used');
        }
    }

    static async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            let task = await prisma.task.findUnique({
                where: { id: Number(id) },
            });
            if (!task) throw formatError(404, 'Task not found');
            await checkUserAccessibility({ req, user_id: task.userId });
            task = await prisma.task.delete({
                where: {
                    id: Number(id),
                },
            });
            return res.status(200).send({
                data: task,
            });
        } catch (error) {
            const { status, message } = error as ResponseError;
            if (status && message) return res.status(status).send(message);
            else return res.status(404).send('Task not found');
        }
    }

    static async edit(req: Request, res: Response): Promise<Response> {
        const { isComplete } = req.body;
        const { id } = req.params;
        const fields: string[] = ['isComplete'];
        const missingValues = fields.filter(key => !(key in req.body));
        try {
            if (missingValues.length > 0)
                throw formatError(400, `${missingValues.join(', ')} are missing`);
            let task = await prisma.task.findUnique({
                where: { id: Number(id) },
            });
            await checkUserAccessibility({ req, user_id: task?.userId });

            let isCompleteBool = task?.isComplete;
            if (!task) throw formatError(404, 'Task not found');
            if (stringEqualTrue(isComplete)) isCompleteBool = true;
            else if (stringEqualFalse(isComplete)) isCompleteBool = false;
            task = await prisma.task.update({
                data: {
                    isComplete: isCompleteBool,
                },
                where: {
                    id: Number(id),
                },
            });
            return res.status(200).send({
                data: task,
            });
        } catch (error) {
            const { status, message } = error as ResponseError;
            if (status && message) return res.status(status).send(message);
            else return res.status(404).send('Task not found');
        }
    }
}

export default TaskController;
