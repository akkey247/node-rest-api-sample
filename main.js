var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(":memory:");
db.run("CREATE TABLE test (name TEXT)");

const express = require('express');
const app = express();

app.use(express.json());

app.get('/lists', (req, res) => {
    Promise.resolve()
        .then(getList)
        .then(value => res.send(value));
});

app.get('/lists/:id', (req, res) => {
    Promise.resolve()
        .then(getList.bind(this, req.params.id))
        .then(result => res.send(result));
});

app.post('/lists', (req, res) => {
    Promise.resolve()
        .then(getNewId)
        .then(createItem.bind(this, req.body))
        .then(getList)
        .then(result => res.send(result));
});

app.put('/lists/:id', (req, res) => {
    Promise.resolve()
        .then(updateItem.bind(this, req.body, req.params.id))
        .then(getList)
        .then(value => res.send(value));
});

app.delete('/lists/:id', (req, res) => {
    Promise.resolve()
        .then(deleteItem)
        .then(value => res.send(value));
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

function createItem(itemData, id) {
    return new Promise(function (resolve, reject) {
        let stmt = db.prepare("INSERT INTO test VALUES (?)");
        stmt.run(itemData.name);
        resolve(id);
    });
}

function updateItem(itemData, id) {
    return new Promise(function (resolve, reject) {
        let stmt = db.prepare("UPDATE test SET name = ? WHERE rowid = ?");
        stmt.run(itemData.name, id);
        resolve(id);
    });
}

function deleteItem(id) {
    return new Promise(function (resolve, reject) {
        let stmt = db.prepare("DELETE FROM test WHERE rowid = ?");
        stmt.run(id);
    });
}