var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(":memory:");
db.run("CREATE TABLE test (name TEXT)");

const express = require('express');
const app = express();

app.use(express.json());

app.get('/lists', (req, res) => {
    Promise.resolve()
        .then(() => getList())
        .then(result => res.send(result));
});

app.get('/lists/:id', (req, res) => {
    Promise.resolve()
        .then(() => getList(req.params.id))
        .then(result => res.send(result));
});

app.post('/lists', (req, res) => {
    let id;
    Promise.resolve()
        .then(() => getNewId())
        .then(result => { id = result; return createItem(req.body); })
        .then(() => getList(id))
        .then(result => res.send(result));
});

app.put('/lists/:id', (req, res) => {
    Promise.resolve()
        .then(() => updateItem(req.params.id, req.body))
        .then(() => getList(req.params.id))
        .then(result => res.send(result));
});

app.delete('/lists/:id', (req, res) => {
    Promise.resolve()
        .then(() => deleteItem(req.params.id))
        .then(result => res.send(result));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function getList(id = null) {
    let where = (id) ? ' WHERE rowid = ' + id : '';
    return new Promise(function (resolve, reject) {
        db.all("SELECT rowid, name FROM test" + where, function (err, rows) {
            resolve(rows);
        });
    });
}

function getNewId() {
    return new Promise(function (resolve, reject) {
        db.all("SELECT rowid FROM test ORDER BY rowid DESC LIMIT 1", function (err, rows) {
            resolve((rows.length == 0) ? 1 : rows[0].rowid + 1);
        });
    });
}

function createItem(itemData) {
    return new Promise(function (resolve, reject) {
        let stmt = db.prepare("INSERT INTO test VALUES (?)");
        stmt.run(itemData.name);
        resolve();
    });
}

function updateItem(id, itemData) {
    return new Promise(function (resolve, reject) {
        let stmt = db.prepare("UPDATE test SET name = ? WHERE rowid = ?");
        stmt.run(itemData.name, id);
        resolve();
    });
}

function deleteItem(id) {
    return new Promise(function (resolve, reject) {
        let stmt = db.prepare("DELETE FROM test WHERE rowid = ?");
        stmt.run(id);
        resolve();
    });
}