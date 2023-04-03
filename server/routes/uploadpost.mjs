import express from 'express';
import fileUpload from 'express-fileupload';
import {uploadToAzureDB} from '../db/azure.mjs';
import {Post} from '../models/Post.mjs';
import {isAuthenticated} from '../utils/util.mjs';

const router = new express.Router();

router.use(express.json());
router.use(
  fileUpload({
    createParentPath: true,
  }),
);

// route to upload image and caption to db
router.post('/post/upload', isAuthenticated, async (req, res) => {
  const caption = req.body.caption;
  const username = req.body.username;
  const file = req.files.image;
  const userToken = req.body.userToken;
  if (file && userToken == req.session.userToken) {
    try {
      await uploadToAzureDB(file, username, caption, Post);
      res.status(201).send({message: 'post upload successful'});
    } catch (error) {
      console.error(error);
      res.status(500).send({error: 'error uploading the post'});
    }
  } else {
    res.status(403).send({error: 'Forbidden request'});
  }
});


export default router;


