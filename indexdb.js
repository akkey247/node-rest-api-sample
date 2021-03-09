class Indexdb {
    constructor (db) {
        this.db = db;
        this.db.run("CREATE TABLE test (name TEXT)");
    }

    getList(id = null) {
        let where = (id) ? ' WHERE rowid = ' + id : '';
        return new Promise((resolve, reject) => {
            this.db.all("SELECT rowid, name FROM test" + where, (err, rows) => {
                resolve(rows);
            });
        });
    }

    getNewId() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT rowid FROM test ORDER BY rowid DESC LIMIT 1", (err, rows) => {
                resolve((rows.length == 0) ? 1 : rows[0].rowid + 1);
            });
        });
    }

    createItem(itemData) {
        return new Promise((resolve, reject) => {
            let stmt = this.db.prepare("INSERT INTO test VALUES (?)");
            stmt.run(itemData.name);
            resolve();
        });
    }

    updateItem(id, itemData) {
        return new Promise((resolve, reject) => {
            let stmt = this.db.prepare("UPDATE test SET name = ? WHERE rowid = ?");
            stmt.run(itemData.name, id);
            resolve();
        });
    }

    deleteItem(id) {
        return new Promise((resolve, reject) => {
            let stmt = this.db.prepare("DELETE FROM test WHERE rowid = ?");
            stmt.run(id);
            resolve();
        });
    }
}

module.exports = Indexdb;