import { v4 as uuidv4 } from 'uuid';
import { Bookmark } from './bookmark.type';

export const createStubBookmark = (): Bookmark => ({
  id: uuidv4(),
  name: 'annualbeta',
  url: 'https://annualbeta.com/',
  createdAt: '2022-03-06T19:43:49.925Z',
  updatedAt: '2022-03-06T19:43:49.925Z',
  notes: null,
});
