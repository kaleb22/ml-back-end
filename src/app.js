const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:4200', // Allow requests only from this origin
    methods: ['GET'], // Allow specific HTTP methods
};

app.use(cors(corsOptions));

app.get('/api/items', (req, res) => {
  const searchTerm = req.query.q;
  console.log(searchTerm)
  fs.readFile('./src/search.json', 'utf-8', (error, json) => {
    if(error) {
      console.error('Error reading file:', error);
      return res.status(500).send('Error reading data file.');
    }

    try {
      const data = JSON.parse(json);
      res.json(data);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Error parsing JSON data.');
    }
  })
})

app.get('/api/items/:id', (req, res) => {
  const id = req.params.id;
  let items;
  let descriptions;

  fs.readFile('./src/items.json', 'utf-8', (error, json) => {
    if(error) {
      console.error('Error reading file:', error);
      return res.status(500).send('Error reading data file.');
    }

    try {
      items = JSON.parse(json);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Error parsing JSON data.');
    }

    fs.readFile('./src/descriptions.json', 'utf-8', (error, json) => {
      if(error) {
        console.error('Error reading file:', error);
        return res.status(500).send('Error reading data file.');
      }

      try {
        descriptions = JSON.parse(json);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).send('Error parsing JSON data.');
      }

      let item = items.filter(el => el.id === id);
      let description = descriptions.filter(el => el.id === id)
      const response = {
        author: {
          name: "Kaleb",
          lastname: "Dalla"
        },
        ...item[0],
       ...description[0]

      }
      res.json(response);
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
