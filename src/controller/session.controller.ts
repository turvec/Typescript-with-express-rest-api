import { Request, Response } from "express";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response){

    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }


    const session = await createSession(user._id, req.get("user-agent") || "");

    //create a access token
    const accessToken = signJwt({ ...user, session: session._id },{expiresIn: config.get<number>('accessTokenTtl')}
    );

    //create a refresh token
    const refreshToken = signJwt({ ...user, session: session._id},{expiresIn: config.get<number>('refreshTokenTtl')}
    );

    return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response){
    const userId = res.locals.user._id

    const sessions = await findSessions({ user: userId, valid: true})

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response){
    const sessionId = res.locals.user.session

    await updateSession({ _id: sessionId}, {value: false});

    return res.send({accessToken: null, refreshToken: null});
}