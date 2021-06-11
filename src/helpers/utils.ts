import moment from 'moment';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { hashSync, compareSync, genSaltSync } from 'bcryptjs';
import { isEmpty } from 'lodash';
import { existsSync } from 'fs';
import prisma from './client';
import { JWT_SECRET, NODE_ENV } from './params';

moment.locale('fr');

const TrueVariation = ['TRUE', 'T', 'Y', 'YES', '1'];
const FalseVariation = ['FALSE', 'F', 'N', 'NO', '0'];

const dateUtils = {
    currentDate: function (formatedDate: string): string {
        return moment().format(formatedDate);
    },
    formatDate: function (date: string, formatedDate: string): string {
        return moment(new Date(date)).format(formatedDate);
    },
};

function prelude(): void | never {
    const envPathName = path.join(process.cwd(), '.env');
    const appConfig = require(path.join(process.cwd(), 'app.config.json'));
    if (NODE_ENV == 'production') return;
    if (existsSync(envPathName)) {
        dotenv.config();

        const missingValues = appConfig.env.filter((key: string) => process.env[key] === undefined);
        if (!isEmpty(missingValues)) {
            throw new Error(
                `Sorry [ ${missingValues.join(', ')}] value(s) are missings on your .env file`,
            );
        }
    } else {
        throw new Error('Sorry your .env file is missing');
    }
}

function formatError(status: number, message: string): object {
    return {
        status,
        message,
    };
}

function checkId(reqUserId: number, foundUserId: number): boolean {
    return reqUserId === foundUserId;
}

const checkUserAccessibility = async ({
    req,
    user_id,
    unauthorizedMsg = 'access',
}: {
    req: Request;
    user_id?: number;
    unauthorizedMsg?: string;
}): Promise<User> | never => {
    const { id } = req.params;
    const { user: currentUser } = req;
    const userId = user_id || id;
    const reqUserId = (currentUser as User).id;
    const newUser = await prisma.user.findUnique({
        where: {
            id: Number(userId),
        },
    });
    if (!newUser) throw formatError(404, 'User not found');
    if (!checkId(reqUserId, newUser.id))
        throw formatError(401, `You cannot ${unauthorizedMsg} this data`);
    return newUser;
};

function hashPassword(password: string): string {
    return hashSync(password, genSaltSync());
}

function isPasswordValid(password: string, storedPassword: string): boolean {
    return compareSync(password, storedPassword);
}

function validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
    return re.test(email.toLowerCase());
}

function stringEqualTrue(str: string): number {
    const index = TrueVariation.findIndex(value => value.toLowerCase() == str.toLowerCase());
    return index;
}

function stringEqualFalse(str: string): number {
    const index = FalseVariation.findIndex(value => value.toLowerCase() == str.toLowerCase());
    return index;
}

function generateWebToken(value: object, extra?: object): string {
    if (JWT_SECRET) return jwt.sign(value, JWT_SECRET, extra);
    return '';
}

function decodeWebToken(token: string): string | object {
    if (JWT_SECRET) return jwt.verify(token, JWT_SECRET);
    return '';
}

export {
    dateUtils,
    prelude,
    validateEmail,
    formatError,
    checkUserAccessibility,
    hashPassword,
    isPasswordValid,
    stringEqualTrue,
    stringEqualFalse,
    generateWebToken,
    decodeWebToken,
};
