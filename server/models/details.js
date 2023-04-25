import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    gender: String,
    dob: String,
    mobile: String,
    username: String,
    email: String,
    password: String,
})
//Creating a Collection //which is set of documents
var details = mongoose.model('details', postSchema)

export default details



