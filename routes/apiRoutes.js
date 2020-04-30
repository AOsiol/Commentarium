const fs = require("fs");
const myData = require("../db/db.json");

function passwordFunction() {
  const num = Math.random() * 1000000;
  return num;
}
module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(myData);
  });

  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote.id = passwordFunction();

    myData.push(req.body);
    fs.writeFile(
      __dirname + "/../db/db.json",
      JSON.stringify(myData),
      function (err) {
        if (err) throw err;
        res.end();
      }
    );
  });

  app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id;
    const index = myData.findIndex(function (data) {
      return +id === +data.id;
    });
    myData.splice(index, 1);
    fs.writeFile(
      __dirname + "/../db/db.json",
      JSON.stringify(myData),
      function (err) {
        if (err) throw err;
        res.end();
      }
    );
  });
};
