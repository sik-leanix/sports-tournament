import { NextFunction, Request, Response } from 'express';
import { createBookmark } from './bookmark.dao';

export async function postBookmarkController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bookmark = await createBookmark(request.body);
    response.send(bookmark);
  } catch (error) {
    next(error);
  }
}
