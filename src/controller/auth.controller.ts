import { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { Role, cr, db } from '../util';

export async function postRegister(req: Request, res: Response) {
  const { name, email, plain } = req.body;

  try {
    const userExist = await db.person.findFirst({ where: { email } });

    if (userExist) {
      return res.json(cr.str('bbad', 'User exists, Please Sign In'));
    }

    const password = await argon2.hash(plain);

    const emailAsString = email as string;
    let role;

    if (emailAsString.includes('@retizen.org') || emailAsString === process.env.ADMIN_EMAIL) {
      role = Role.ADMIN;
    } else {
      role = Role.USER;
    }

    const user = await db.person.create({ data: { email, name, password, role } });

    //? <================| SIGN IN |================>

    if (user.role === Role.USER) {
      const userToken = jwt.sign({ uid: user.id, usrid: user.userid }, process.env.JWT_SECRET!);

      return res
        .cookie('tusrid', userToken, { httpOnly: true, secure: true })
        .json(cr.strLoad('aok', 'Signed in successfully', { token: userToken }));
    } else if (user.role === Role.ADMIN) {
      const adminToken = jwt.sign({ uid: user.id, usrid: user.userid }, process.env.JWT_SECRET!);

      return res
        .cookie('tadmusrid', adminToken, { httpOnly: true, secure: true })
        .json(cr.str('aok', 'Signed in successfully'));
    } else {
      return res.json(cr.str('bbad', 'Something went wrong'));
    }
  } catch (error) {
    return res.json(cr.str('cfail', 'Registration Failed'));
  }
}

export async function postLogin(req: Request, res: Response) {
  const { email, plain } = req.body;

  try {
    const user = await db.person.findFirst({ where: { email } });

    if (!user) {
      return res.json(cr.str('bbad', 'User Not Found, Please Sign Up'));
    }

    const verifyPassword = await argon2.verify(user.password, plain);

    if (!verifyPassword) {
      return res.json(cr.str('bbad', 'Wrong Credentials'));
    }

    //? <================| SIGN IN |================>

    if (user.role === Role.USER) {
      const userToken = jwt.sign({ uid: user.id, usrid: user.userid }, process.env.JWT_SECRET!);

      return res
        .cookie('tusrid', userToken, { httpOnly: true, secure: true })
        .json(cr.strLoad('aok', 'Signed in successfully', { token: userToken }));
    } else if (user.role === Role.ADMIN) {
      const adminToken = jwt.sign({ uid: user.id, usrid: user.userid }, process.env.JWT_SECRET!);

      return res
        .cookie('tadmusrid', adminToken, { httpOnly: true, secure: true })
        .json(cr.str('aok', 'Signed in successfully'));
    } else {
      return res.json(cr.str('bbad', 'Something went wrong'));
    }
  } catch (error) {
    return res.json(cr.str('cfail', 'Failed To sign In'));
  }
}
