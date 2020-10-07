const { XMLHttpRequest } = require('xmlhttprequest');
const childProc = require('child_process');
const express = require('express');
const path = require('path');

const app = express();
const body = require('body-parser');

app.use(body.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

const port = process.env.PORT || 3000;

app.listen(port);
