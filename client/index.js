import express, { application } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import passportLocalMongoose from 'passport-local-mongoose'
import User from '../server/models/details.js'
import session from 'express-session'

const PORT = process.env.PORT || 9500
const app = express();

const password = 'UseSarfrajData120'
const CONNECTION_URL = `mongodb+srv://Sarfraj:${password}@cluster0.rse9f.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, (req, res) => console.log(`listening on port ${PORT}`)))
    .catch((error) => console.log(error.message) )



app.get('/register.html', (req, res) => {
    res.sendFile('/home/sarfraj/Memories/client/HTML/register.html')
})

app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.sendFile('/home/sarfraj/Memories/client/HTML/index.html');
})


app.post('/register', async (req, res) => {

    const first_name = req.body.fname
    const last_name = req.body.lname
    const gender = req.body.gender
    const dob = req.body.dob
    const mobile = req.body.mobile
    const user_name = req.body.uname
    const email = req.body.email
    const password = req.body.password

    const data = {
        "first_name": first_name,
        "last_name": last_name,
        "gender": gender,
        "dob": dob,
        "mobile": mobile,
        "user_name": user_name,
        "email": email,
        "password": password
    }
    console.log(first_name, last_name);
    db.collection('User').insertOne(data,function(err, collection){
        if (err) 
            throw err;
        console.log("Record inserted Successfully");   
});
    
return res.send('SignUp Successful');
    // console.log(first_name)
    // const user = await User({ first_name, last_name, gender, dob, mobile, user_name, email, password });
    // try {
    //     await user.save();
    //     res.status(201).json(user);
    // } catch(error) {
    //     res.status(409).json({ message: error.message })
    // }
})