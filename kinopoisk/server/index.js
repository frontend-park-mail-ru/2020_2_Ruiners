const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '..', 'public')));


  app.all('*', (req, res) => {
     console.log(req.url, res.body);
     res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });


app.listen(port);
