exports.authenticateLocal = async (req, res) => {
  //res.redirect('/');
  console.log(req);
  const token = req.user.generateAuthToken();
  const authUser = await req.user.dbSetAuthToken(token);

  res.send(token);
};

exports.authenticateGoogle = (req, res) => {
  res.send(req.user);
};

exports.authenticateFacebook = (req, res) => {
  res.send(req.user);
};
