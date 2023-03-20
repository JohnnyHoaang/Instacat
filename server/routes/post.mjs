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
router.get('/cat/all/', async (req, res)=>{
  await sendData(res, Post, {});
});
// Returns specific adoption post using id
router.get('/adoption/id/:id', async (req, res) => {
  await sendData(res, AdoptionPost, {id: req.params.id});
});

// Returns all adoption posts
router.get('/adoption/all', async (req, res)=>{
  await sendData(res, AdoptionPost, {});
});

export default router;

/**
 * Helper function that sends data to api
 * @param {*} res
 * @param {*} model
 * @param {*} query
 */
async function sendData(res, model, query) {
  const data = await db.getQueryData(model, query);
  if (data.length > 0) {
    res.json(data);
  } else {
    res.status(404).send({error: 'data not found'});
  }
}

