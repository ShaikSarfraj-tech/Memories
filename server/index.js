import express, { json } from "express";
import bodyParser from "body-parser";
import fs from 'fs';
import cors from 'cors'
import mongoose from 'mongoose'
import postRoutes from './routes/posts.js'
import memories_colls from "./models/memories_colls.js";

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/posts', postRoutes);

const password = 'UseSarfrajData120'
const CONNECTION_URL = `mongodb+srv://Sarfraj:${password}@cluster0.rse9f.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 1100;

mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, (req, res) => console.log(`listening on port ${PORT}`)))
    .catch((error) => console.log(error.message) )



app.get('/', (req, res) => {
    res.send('Welcome to backend');
})


let all_posts = [];
app.get('/memories', async (req, res) => {
        try {
            all_posts = await memories_colls.find();
            console.log(all_posts)
            
            res.status(200).json(all_posts);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
})


export default all_posts