const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;

const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
	return response.redirect('/form-with-post');
});

app.get('/form-with-post', function(request, response) {
	return response.render('form-with-post');
});

app.post('/submit-form-with-post', function(request, response) {
	return response.send(request.body);
});

app.listen(port, function () {
  console.log('Demo01 Node.js app is listing on 8080')
})
