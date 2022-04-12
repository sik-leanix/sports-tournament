import request from 'supertest';
import { v4 as uuid } from 'uuid';
import { postBookmarkController } from './post-bookmark.controller';
import { server } from '../test.functions';
import { createStubBookmark } from './bookmark.stub';
import { Bookmark } from './bookmark.type';

jest.mock('./bookmark.dao');

describe('postBookmarkController', () => {
  const route = '/bookmarks';

  const app = server((app) => {
    app.post(route, postBookmarkController);
  });

  it('creates a bookmark and returns it with an id', async () => {
    const createBookmark = require('./bookmark.dao').createBookmark;
    const bookmark = createStubBookmark();
    delete bookmark.id;
    const createdBookmark: Bookmark = {
      ...bookmark,
      id: uuid(),
    };
    createBookmark.mockResolvedValue(createdBookmark);

    const response = await request(app).post(route).send(bookmark).expect(200);

    expect(response).toHaveProperty('body', createdBookmark);
    expect(createBookmark).toHaveBeenCalledWith(bookmark);
  });

  it('rejects an invalid request body', async () => {
    const createBookmark = require('./bookmark.dao').createBookmark;

    const response = await request(app).post(route).send({}).expect(400);

    expect(response).toHaveProperty(
      'body.message',
      "request.body should have required property 'name', request.body should have required property 'url'"
    );
    expect(createBookmark).not.toHaveBeenCalled();
  });
});
