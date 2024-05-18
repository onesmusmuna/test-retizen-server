import { Request, Response } from 'express';
import { cr, db } from '../util';

export async function postPost(req: Request, res: Response) {
  // @ts-ignore
  const usrid = req.usid;

  const { county, location, category, summary, more, thumbnail } = req.body;

  try {
    await db.post.create({ data: { userid: usrid, county, location, category, summary, more, thumbnail } });

    return res.json(cr.str('aok', 'Post created Successfully'));
  } catch (error) {
    return res.json(cr.str('cfail', 'Failed to create Post'));
  }
}

export async function getPosts(req: Request, res: Response) {
  try {
    const posts = await db.post.findMany({ where: { approved: true } });

    return res.json(cr.load('aok', { load: posts }));
  } catch (error) {
    return res.json(cr.str('cfail', 'Failed to Fetch Posts'));
  }
}
