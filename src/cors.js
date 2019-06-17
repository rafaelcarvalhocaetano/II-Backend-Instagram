module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://dashboard.heroku.com/apps/cl-instagram');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}