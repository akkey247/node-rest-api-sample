class Indexdb {
    constructor (db) {
        this.db = db;
    }

    createTable() {
        return new Promise((resolve, reject) => {
            this.db.run("CREATE TABLE test (name TEXT)", (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    getList(id = null) {
        let where = (id) ? ' WHERE rowid = ' + id : '';
        return new Promise((resolve, reject) => {
            this.db.all("SELECT rowid, name FROM test" + where, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    getNewId() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT rowid FROM test ORDER BY rowid DESC LIMIT 1", (err, rows) => {
                if (err) reject(err);
                resolve((rows.length == 0) ? 1 : rows[0].rowid + 1);
            });
        });
    }

    createItem(itemData) {
        return new Promise((resolve, reject) => {
            let stmt = this.db.prepare("INSERT INTO test VALUES (?)");
            stmt.run(itemData.name, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    updateItem(id, itemData) {
        return new Promise((resolve, reject) => {
            let stmt = this.db.prepare("UPDATE test SET name = ? WHERE rowid = ?");
            stmt.run(itemData.name, id, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    deleteItem(id) {
        return new Promise((resolve, reject) => {
            let stmt = this.db.prepare("DELETE FROM test WHERE rowid = ?");
            stmt.run(id, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }
}

module.exports = Indexdb;