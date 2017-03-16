const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src'));

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  fs.readFile(`${_dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.locals.folders = [
  { id: 1,
    name: 'puppies',
    urls: []
  }
];

app.get('/api/v1/folders', (request, response) => {
  response.status(201).json(app.locals.folders)
})

app.get('/api/v1/folders/:id', (request, response) => {
  const { id } = request.params

  if(!id) {
    return response.status(422).send({
      error: 'ID did not match any existing folders'
    })
  }

  const folder = app.locals.folders.find(folder => {
    return folder.id == id
  })

  response.status(201).json(folder)
})

app.post('/api/v1/folders', (request, response) => {
  const { folder } = request.body
  const id = md5(folder)
  const { folders } = app.locals

  let dupe = false;
  folders.forEach(item => {
    if(folder === item.name) {
    dupe = true;
    }
  })

  if(dupe) {
    return response.status(422).json('dupe')
  }
  app.locals.folders.push({ name: folder, id, urls: [] })
  response.status(201).json(app.locals.folders)
})

app.put('/api/v1/folders/:id', (request, response) => {
  const { id } = request.params
  const { longURL } = request.body
  let { folders } = app.locals
  const folder = folders.find(folder => {
    return folder.id == id
  })
  const shortURL = md5(longURL).slice(0, 5)
  const newURLObject = {
    longURL,
    shortURL,
    dateCreated: Date.now(),
    visitCount: 0
  }
  const updatedFolders = folders.map(folder => {
    if(folder.id == id) {
      folder.urls.push(newURLObject)
    }
    return folder
  })

  response.status(201).json(folder);
})

app.get(`/:shortURL`, (request, response) => {
  const { shortURL } = request.params;
  let longURL;
  app.locals.folders.forEach(folder => {
    folder.urls.forEach(url => {
      if(url.shortURL === shortURL) {
        url.visitCount++
        return longURL = url.longURL
      }
    })
  })
  response.redirect(`${longURL}`);
})

if(!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`The shit is lit AF over at ${app.get('port')}`);
  })
}

module.exports = app;
