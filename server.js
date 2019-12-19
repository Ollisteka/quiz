const express = require('express');
const path = require('path');

const app = express();
const port = 8888;

const rootDir = process.cwd();

app.use('/static', express.static('static'));

app.get('/', (req, res) => res.sendFile(path.join(rootDir, '/static/index.html')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));