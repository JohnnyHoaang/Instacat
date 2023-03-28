import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const router = new express.Router();

router.use(express.json());

router.get(
  ['/home', '/contact', '/discover', '/aboutUs', '/adopt', '/add/post', '/edit/profile', '/cats/*'],
  (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

router.get('/admin', (req, res, next) => {
  try {
    if (req.session.user.isAdmin) {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    } else {
      next();
    }
  } catch {
    next();
  }
});

router.use((req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, '../client/build/not-found.html'));
});

export default router;

