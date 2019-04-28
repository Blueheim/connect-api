exports.authenticateLocal = async (req, res) => {
  //res.redirect('/');

  const token = req.user.generateAuthToken();
  const authUser = await req.user.dbSetAuthToken(token);

  res.status(200).send({ token: token });
};

exports.authenticateGoogle = (req, res) => {
  res.json(req.user);
};

exports.authenticateFacebook = (req, res) => {
  res.json(req.user);
};
