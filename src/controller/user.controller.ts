import { Request, Response } from 'express';
import { Role, cr, db } from '../util';

export async function getUser(req: Request, res: Response) {
  // @ts-ignore
  const usrid = req.usid;

  try {
    const user = await db.person.findFirst({ where: { userid: usrid } });

    if (!user) {
      return res.json(cr.str('bbad', 'User Not Found'));
    }

    if (user.role !== Role.USER) {
      return res.json(cr.str('bbad', 'User Not Found'));
    }

    const { password, userid, role, code, updated, ...load } = user;

    return res.json(cr.load('aok', load));
  } catch (error) {
    return res.json(cr.str('cfail', 'Failed To Get User'));
  }
}

export async function getAdmin(req: Request, res: Response) {
  // @ts-ignore
  const usrid = req.adusid;

  try {
    const user = await db.person.findFirst({ where: { userid: usrid } });

    if (!user) {
      return res.json(cr.str('bbad', 'User Not Found'));
    }

    if (user.role !== Role.ADMIN) {
      return res.json(cr.str('bbad', 'User Not Found'));
    }

    const { password, userid, role, code, ...load } = user;

    return res.json(cr.load('aok', load));
  } catch (error) {
    return res.json(cr.str('cfail', 'Failed To Get User'));
  }
}
