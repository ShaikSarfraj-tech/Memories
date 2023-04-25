import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    vlog_title: String,
    date_from: String,
    date_to: String,
    vlog_cover: String,
    imgs: [],
    note: String
})
//Creating a Collection //which is set of documents
var memories_coll = mongoose.model('memories_colls', postSchema)

export default memories_coll



