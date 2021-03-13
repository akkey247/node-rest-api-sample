const sqlite3 = require("sqlite3").verbose();

const Indexdb = require('./indexdb.js');

test('テーブル作成', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    let result = await indexdb.createTable();
    expect(result).toEqual(true);
});

test('既存レコード０件でレコード一覧取得', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    let result = await indexdb.getList();
    expect(result).toEqual([]);
});

test('既存レコード０件で新規レコードIDを取得', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    let result = await indexdb.getNewId();
    expect(result).toEqual(1);
});

test('既存レコード０件で新規レコードを作成', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    let result = await indexdb.createItem({"name":"aaa"});
    expect(result).toEqual(true);
});

test('既存レコード１件でレコード一覧取得', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    await indexdb.createItem({"name":"aaa"});
    let result = await indexdb.getList();
    expect(result).toEqual([{"rowid":1,"name":"aaa"}]);
});

test('既存レコード１件で新規レコードIDを取得', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    await indexdb.createItem({"name":"aaa"});
    let result = await indexdb.getNewId();
    expect(result).toEqual(2);
});

test('既存レコード１件で新規レコードを作成', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    await indexdb.createItem({"name":"aaa"});
    let result = await indexdb.createItem({"name":"bbb"});
    expect(result).toEqual(true);
});

test('既存レコード２件でレコード一覧取得', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    await indexdb.createItem({"name":"aaa"});
    await indexdb.createItem({"name":"bbb"});
    let result = await indexdb.getList();
    expect(result).toEqual([{"rowid":1,"name":"aaa"},{"rowid":2,"name":"bbb"}]);
});

test('存在するレコードを取得', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    await indexdb.createItem({"name":"aaa"});
    await indexdb.createItem({"name":"bbb"});
    let result = await indexdb.getList(2);
    expect(result).toEqual([{"rowid":2,"name":"bbb"}]);
});

test('存在しないレコードを取得', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    await indexdb.createItem({"name":"aaa"});
    await indexdb.createItem({"name":"bbb"});
    let result = await indexdb.getList(3);
    expect(result).toEqual([]);
});

test('存在するレコードを更新', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    await indexdb.createItem({"name":"aaa"});
    await indexdb.createItem({"name":"bbb"});
    let result = await indexdb.updateItem(2, {"name":"xxx"});
    expect(result).toEqual(true);
});

test('存在しないレコードを更新', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    await indexdb.createItem({"name":"aaa"});
    await indexdb.createItem({"name":"bbb"});
    let result = await indexdb.updateItem(3, {"name":"xxx"});
    expect(result).toEqual(true);
});

test('存在するレコードを削除', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    await indexdb.createItem({"name":"aaa"});
    await indexdb.createItem({"name":"bbb"});
    let result = await indexdb.deleteItem(2);
    expect(result).toEqual(true);
});

test('存在しないレコードを削除', async () => {
    const db = new sqlite3.Database(":memory:");
    const indexdb = new Indexdb(db);
    await indexdb.createTable();
    await indexdb.createItem({"name":"aaa"});
    await indexdb.createItem({"name":"bbb"});
    let result = await indexdb.deleteItem(3);
    expect(result).toEqual(true);
});
