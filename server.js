const express = require('express');

const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const index = require('./route');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api/recordings',index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(res.locals.message);
});


app.listen(port, () => console.log(`Listening on port ${port}`));