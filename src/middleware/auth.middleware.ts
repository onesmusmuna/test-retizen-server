import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role, cr, db } from '../util';

export async function userAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies['tusrid'];

  if (!token) {
    return res.json(cr.str('bbad', 'Access Denied'));
  }

  const payload: any = jwt.verify(token, process.env.JWT_SECRET!);

  try {
    const user = await db.person.findFirst({ where: { id: payload.uid, userid: payload.usrid } });

    if (!user) {
      return res.json(cr.str('bbad', 'Access Denied'));
    }

    if (user.role !== Role.USER) {
      return res.json(cr.str('bbad', 'Access Denied'));
    }

    // @ts-ignore
    req.usid = user.userid;

    next();
  } catch (error) {
    return res.json(cr.str('bbad', 'Access Denied'));
  }
}

//? |==============================================================

export async function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies['tadmusrid'];

  if (!token) {
    return res.json(cr.str('bbad', 'Access Denied'));
  }

  const payload: any = jwt.verify(token, process.env.JWT_SECRET!);

  try {
    const user = await db.person.findFirst({ where: { id: payload.uid, userid: payload.usrid } });

    if (!user) {
      return res.json(cr.str('bbad', 'Access Denied'));
    }

    if (user.role !== Role.ADMIN) {
      return res.json(cr.str('bbad', 'Access Denied'));
    }

    // @ts-ignore
    req.adusid = user.userid;

    next();
  } catch (error) {
    return res.json(cr.str('bbad', 'Access Denied'));
  }
}
