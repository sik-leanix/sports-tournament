import express from 'express';
import { validateInputs } from '../pre-request-handlers/openapi';
import { getBookmarksController } from './get-bookmarks.controller';
import { postBookmarkController } from './post-bookmark.controller';

export const bookmarkRoute = express.Router({ mergeParams: true });

bookmarkRoute.use(validateInputs);

bookmarkRoute.get('', getBookmarksController);
bookmarkRoute.post('', postBookmarkController);
