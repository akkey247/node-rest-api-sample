var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(":memory:");
db.run("CREATE TABLE test (name TEXT)");

const express = require('express');
const app = express();

app.use(express.json());

app.get('/lists', async (req, res) => {
    let result;
    result = await getList();
    res.send(result);
});

app.get('/lists/:id', async (req, res) => {
    let result;
    result = getList(req.params.id);
    res.send(result);
});

app.post('/lists', async (req, res) => {
    let result, id;
    id = await getNewId();
    await createItem(req.body);
    result = await getList(id);
    res.send(result);
});

app.put('/lists/:id', async (req, res) => {
    let result;
    await updateItem(req.params.id, req.body);
    result = await getList(req.params.id);
    res.send(result);
});

app.delete('/lists/:id', async (req, res) => {
    await deleteItem(req.params.id);
    res.send();
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