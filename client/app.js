import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import fs from 'fs'
import User from '../server/models/details.js'
import path from 'path'
import memories_colls from '../server/models/memories_colls.js'
import userDB from './public/data.js';
import details from '../server/models/details.js';
import { MongoClient } from 'mongodb';
mongoose.connect('mongodb+srv://Sarfraj:UseSarfrajData120@cluster0.rse9f.mongodb.net/?retryWrites=true&w=majority');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})


var app = express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));
var url = "mongodb+srv://Sarfraj:UseSarfrajData120@cluster0.rse9f.mongodb.net/?retryWrites=true&w=majority";

app.post("/login", async (req, res) => {
	try {
	  const { email, passwd } = req.body;
	  console.log(email, passwd);
	  MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		dbo.collection("details").findOne({email}, function(err, user) {
		  if (err) throw err;
		  console.log(user);
		//   db.close();

		  if(user.password === passwd) {
			return res.redirect('profile.html');
		  } else {
			return res.status(400).send("User not found");
		  }
		});
	  });	


	
	} catch (err) {
		console.log(err);
		res.status(500).send("Something went wrong");
	}
  });
app.post('/sign_up',function (req, res) {
	var first_name = req.body.fname;
	var last_name = req.body.lname;
	var dob = req.body.dob;
	var mobile = req.body.mobile;
	var gender = req.body.gender;
	var email =req.body.email;
	var pass = req.body.password;

	var data = {
		"first_name": first_name,
		"last_name": last_name,
		"dob": dob,
		"mobile": mobile,
		"gender": gender,
		"email":email,
		"password":pass,
	}
    db.collection('details').insertOne(data,function(err, collection){
            if (err) throw err;
            console.log("Record inserted Successfully");
                
    });
		
	return res.redirect('index.html');
})

const PORT = 7000;

app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect('index.html');
}).listen(PORT)


const base64_encode = (file) => {
	var bitmap = fs.readFileSync(file);
	return new Buffer(bitmap).toString('base64')
}

app.post('/newMemory', (req, res) => {

	var vlog_title = req.body.vlog_title;
	var date_from = req.body.date_from;
	var date_to = req.body.date_to
	var temp =req.body.vlog_cover;
	var vlog_cover = new Buffer(temp).toString('base64');
	var imgs = req.body.images;
	var note = req.body.note;

	console.log(vlog_cover);

	var data = {
		vlog_title: vlog_title,
		date_from: date_from,
		date_to: date_to,
		vlog_cover: vlog_cover,
		imgs: imgs,
		note: note
	}
    db.collection('memories_colls').insertOne(data,function(err, collection){
            if (err) 
				throw err;
            console.log("Record inserted Successfully");
                
    });
		
	return res.status(200).json(data);
})



console.log(`server listening at port ${PORT}`);
