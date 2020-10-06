const { XMLHttpRequest } = require('xmlhttprequest');
const childProc = require('child_process');
const express = require('express');
const path = require('path');

const app = express();
const body = require('body-parser');

app.use(body.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

const port = process.env.PORT || 3000;


app.post('*', function (req, res) {
  var xhr = new XMLHttpRequest();
  var domain = req.headers.host
  domain = 'http://' + domain.substring(0, domain.length - 5) + ':8000'
  var url = domain + req.url;
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

app.post('*', (req, res) => {
  const xhr = new XMLHttpRequest();
  let domain = req.headers.host;
  domain = `http://${domain.substring(0, domain.length - 5)}:8080`;
  const url = domain + req.url;
  xhr.open('POST', url, false);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.crossOrigin = true;
  xhr.withCredentials = true;
  xhr.send(JSON.stringify(req.body));
  res.status(xhr.status).json(xhr.responseText);
});

app.listen(port);
