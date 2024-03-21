const express = require('express');
const { post, formToJSON } = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('view options', {
    client: false, 
    escapeFunction: function(html) {
        return html.replace(/[&<>"']/g, function(match) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[match];
        });
    }, 
    escape: false 
});
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    return res.render('index');
});

app.post('/request', async (req, res) => {
    let { url, body, type } = req.body;
    if (!url) {
        return res.status(400).send('URL is required');
    }
    if (!body) {
        const response = await post(url);
        return res.render('response', { data: response.status });
    }
    let data = new FormData();
    if (!Array.isArray(body)) {
        return res.status(400).send('Invalid body');
    }
    body.forEach(({key, value}) => {
        data.append(key, value);
    });
    if (type === 'json') {
        data = formToJSON(data);
    }
    const response = await post(url, data);
    return res.render('response', { data: response.status });
});

app.listen(8080, () => {
    console.log('Listening on 8080');
});