import app from '../app.mjs';
import {Mongo} from '../db/db.mjs';

const PORT = process.env.PORT || 8080;
const mongo = new Mongo();

main();

/**
 * Responsible for running the server and graceful shutdown
 */
async function main() {
  await mongo.connect();

  const server = app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
  });

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  /**
   * Gracefully shutsdown server
   */
  async function shutdown() {
    console.log('Shutting down');
    server.close(async () => {
      console.log('HTTP server closed.');
      await mongo.disconnect();
      process.exit();
    });
  }
}
