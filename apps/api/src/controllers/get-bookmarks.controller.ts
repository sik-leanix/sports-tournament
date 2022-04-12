import { NextFunction, Request, Response } from 'express';
import { getBookmarks } from './bookmark.dao';

export async function getBookmarksController(
  _request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bookmarks = await getBookmarks();
    response.send(bookmarks);
  } catch (error) {
    next(error);
  }
}
