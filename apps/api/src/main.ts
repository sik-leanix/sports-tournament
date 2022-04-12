import app from './app';

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/bookmarks`);
});
server.on('error', console.error);
