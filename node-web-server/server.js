const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/src/app'));
app.use(express.static(__dirname + '/public/src'));


app.get('/', (req, res) => {
    res.end('<h1>hello express!</h1>');
});

app.get('/about', (req, res) => {
    res.send('About');
});

app.get('/bad', (req, res) => {
    res.send({
        error: "error handling request"
    });
});

app.get('/angular', (req, res) => {
    res.sendfile('./public/src/app/app.component.html');
});

/*
app.listen(3000, () => {
    console.log("server is up");
}); // listen to the request on port 3000
*/

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});