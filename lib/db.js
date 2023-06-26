var mysql = require("mysql");

// 연결할 DB 정보 입력
const connection = mysql.createConnection({
    host: 'database-1.cf9xpn9g7db2.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '11111111',
    database: 'student',
    port: '3306',
});



connection.connect();

module.exports = connection;
