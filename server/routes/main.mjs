import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const router = new express.Router();

router.use(express.json());

router.get(
    ['/home', '/contact', '/discover', '/aboutUs', '/adopt', '/add/post', '/cats/*'],
    (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

router.use((req, res) => {
  res
      .status(404)
      .sendFile(path.join(__dirname, '../client/build/not-found.html'));
});

export default router;

