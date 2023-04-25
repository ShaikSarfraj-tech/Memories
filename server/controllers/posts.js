import mongoose from 'mongoose'

import memories_colls from '../models/memories_colls.js'

export const getPosts = async (req, res) => {
    try {
        const all_posts = await memories_colls.find();
        console.log(all_posts);
        res.status(200).json(all_posts);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await memories_colls.find({ id })
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { vlog_title, date_from, date_to, vlog_cover, imgs, note } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post exits with id: ${id}`);

    const updatedPost = { vlog_title, date_from, date_to, vlog_cover, imgs, note, _id: id };
    await memories_colls.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const createPost = async (req, res) => {
    const { vlog_title, date_from, date_to, vlog_cover, imgs, note } = req.body

    const newPost = new memories_colls({ vlog_title, date_from, date_to, vlog_cover, imgs, note });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error)  {
        res.status(409).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json(`No Post Exists With the ID: ${id}`)

    await memories_colls.findByIdAndRemove(id);
    res.json({ message: "Post Deleted Successfully" });

}