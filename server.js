const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());
app.use(express.json({ extended: false }));

app.post("/", (req, res) => {
  const { searchterm } = req.body;

  axios
    .get(`http://itunes.apple.com/search?term=${searchterm}`)
    .then(response => {
      if (!Error === undefined) {
        console.log("HERE!!!!!!");
      }
      if (response.data.results[0]) {
        let id = response.data.results[0].artistId;

        let url = `https://itunes.apple.com/lookup?id=${id}&entity=album`;
        return axios.get(url);
      }
    })
    .then(results => res.json(results.data))
    .catch(err => {
      res.json([]);
      return console.log("Server error or Not In Database");
    });
});

app.listen(8000, () => {
  console.log(`Server started on 8000`);
});
