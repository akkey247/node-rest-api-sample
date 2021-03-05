# 使い方

## 起動方法

### 1. モジュールのインストール

```
$ npm i
```

### 2. 起動する

```
$ npm start
```

## 使用例

### 一覧取得

```
$ curl http://localhost:3000/lists
```

### 一件取得

```
$ curl http://localhost:3000/lists/1
```

### 新規登録

```
$ curl http://localhost:3000/lists -X POST -H "Content-Type: application/json" -d '{"name":"テストデータ"}'
```

### 更新

```
$ curl http://localhost:3000/lists/1 -X PUT -H "Content-Type: application/json" -d '{"name":"テストデータ(更新済み)"}'
```

### 削除

```
$ curl http://localhost:3000/lists/1 -X DELETE
```
