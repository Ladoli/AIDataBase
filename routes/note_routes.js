module.exports = function(app) {
  app.post('/notes', (req, res) => {
  console.log(req.body)
  res.send('Hello')
  });
};
