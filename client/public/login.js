const authentication = (req, res) => {
	const email = req.body.email;
	const passwd = req.body.passwd

	console.log(passwd);

	const user_details = db.collection('details').find({ email: email});
	if(user_details.password === passwd) {
		res.redirect(path.resolve('/home/sarfraj/Memories/client/HTML/profile.html'));
	} else {
		res.send("User Details are not Correct");
	}
}

export default authentication;