import express from 'express'

import { getPost, getPosts, createPost, updatePost, deletePost } from '../controllers/posts.js'

const router = express.Router();

// router.get('/memories', getPosts);
router.get('/:id', getPost);
router.post('../../HTML/newMemories.html', createPost);
router.patch('/', updatePost);
router.delete('/', deletePost);

export default router