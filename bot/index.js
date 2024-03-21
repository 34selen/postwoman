const express = require('express');
const { visit } = require('./bot');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/check', (req, res) => {
    res.send('<form method="post"><input value="check" type="submit" /></form>');
});

app.post('/check', (req, res) => {
    visit().then(result => {
        res.send(result);
    });
});

app.listen(8081);
