var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(":memory:");

const express = require('express');
const app = express();

const Indexdb = require('./indexdb.js');
const indexdb = new Indexdb(db);

app.use(express.json());

app.get('/lists', async (req, res) => {
    let result;
    result = await indexdb.getList();
    res.send(result);
});

app.get('/lists/:id', async (req, res) => {
    let result;
    result = await indexdb.getList(req.params.id);
    res.send(result);
});

app.post('/lists', async (req, res) => {
    let result, id;
    id = await indexdb.getNewId();
    await indexdb.createItem(req.body);
    result = await indexdb.getList(id);
    res.send(result);
});

app.put('/lists/:id', async (req, res) => {
    let result;
    await indexdb.updateItem(req.params.id, req.body);
    result = await indexdb.getList(req.params.id);
    res.send(result);
});

app.delete('/lists/:id', async (req, res) => {
    await indexdb.deleteItem(req.params.id);
    res.send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
