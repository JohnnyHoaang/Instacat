import express from 'express';
import {Post} from '../models/Post.mjs';
import {DBHelper} from '../db/dbHelper.mjs';
import {AdoptionPost} from '../models/AdoptionPost.mjs';

const router = new express.Router();
const db = new DBHelper();

router.use(express.json());

// Returns specific post using id
router.get('/cat/id/:id', async (req, res) => {
  await sendData(res, Post, {id: req.params.id});
});
// Returns all cat posts
router.get('/cat/all/', async (req, res) => {
  await sendData(res, Post, {});
});
// Returns specific adoption post using id
router.get('/adoption/id/:id', async (req, res) => {
  await sendData(res, AdoptionPost, {id: req.params.id});
});

// Returns all adoption posts
router.get('/adoption/all', async (req, res) => {
  await sendData(res, AdoptionPost, {});
});
// Returns all posts with the specified hashtag
router.get('/hashtag/:hashtag', async (req, res) => {
  const hashtag = req.params.hashtag;
  await sendData(res, Post, {hashtags: {'$regex': hashtag}});
});
router.get('/search/:query', async (req, res)=>{
  const query = req.params.query;
  await sendData(res, Post, {caption: {'$regex': query}});
});

export default router;

/**
 * Send data to the API route
 * @param {Object} response
 * @param {Model} model
 * @param {String} query
 */
async function sendData(response, model, query) {
  // Receive data from db
  const data = await db.getQueryData(model, query);
  if (data.length > 0) {
    // send data to route
    response.json(data);
  } else {
    response.status(404).send({error: 'data not found'});
  }
}

