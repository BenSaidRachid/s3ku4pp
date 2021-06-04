import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from '../helpers/params';
import prisma from '../helpers/client';

/**
 * JSON Web Token strategy
 */

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        },
        async (jwtPayload, next) => {
            const { id } = jwtPayload;
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (!user) next('User not found');
            next(null, user);
        },
    ),
);
