import { postgres } from '../db/database';
import { Bookmark } from './bookmark.type';

export interface BookmarkFromDatabase {
  id: string;
  name: string;
  url: string;
  created_at: string;
  updated_at: string;
  notes: string | null;
}
const allBookmarkFields = [
  'id',
  'name',
  'url',
  'created_at',
  'updated_at',
  'notes',
];

export async function createBookmark(
  bookmarkData: Omit<Bookmark, 'id'>
): Promise<Bookmark> {
  const createdBookmark: BookmarkFromDatabase = await postgres
    .table<Bookmark>('bookmarks')
    .insert(bookmarkData)
    .returning(allBookmarkFields);
  return mapBookmarkRowToBookmark(createdBookmark);
}

export async function getBookmarks(): Promise<Bookmark[]> {
  const dbBookmarks = await postgres
    .table<Bookmark>('bookmarks')
    .select<BookmarkFromDatabase[]>(allBookmarkFields);
  return dbBookmarks.map(mapBookmarkRowToBookmark);
}

function mapBookmarkRowToBookmark(bookmarkFromDb: BookmarkFromDatabase) {
  return {
    id: bookmarkFromDb.id,
    name: bookmarkFromDb.name,
    url: bookmarkFromDb.url,
    createdAt: bookmarkFromDb.created_at,
    updatedAt: bookmarkFromDb.updated_at,
    notes: bookmarkFromDb.notes,
  };
}
