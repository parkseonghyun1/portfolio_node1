const mysql = require('mysql');
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { request } = require('http');
const { error } = require('console');
const connection = require('./lib/db');

const app = express();



// connection.connect();

// connection.query('create table student (name VARCHAR(50) NOT NULL, number VARCHAR(10) NOT NULL, gender VARCHAR(10) NOT NULL, phonenumber VARCHAR(20) NOT NULL);', (error, results, fields) => {
//     if (error) throw error;
//     console.log(results);
// });

// connection.query('insert into student (name, number, gender, phonenumber) values (\'김규리\', \'00000\', \'여자\', \'010-0000-0000\'), (\'김성윤\', \'11111\', \'남자\', \'010-1111-1111\'), (\'김우영\', \'22222\', \'남자\', \'010-2222-2222\'), (\'김태훈\', \'33333\', \'남자\', \'010-3333-3333\'), (\'나서은\', \'44444\', \'여자\', \'010-4444-4444\');', (error, results, fields) => {
//     if (error) throw error;
//     console.log(results);
// });

// connection.end();

app.use(bodyParser.urlencoded({
    extended: false,
 }));

app.use(express.static(`${__dirname}/public`));

app.get('/', (request, response) => {
    fs.readFile('public/studentList.html', 'utf-8', (error, data) => {
        connection.query('SELECT * from student', (error, results, fields) => {
            if (error) throw error;
            response.send(ejs.render(data, {
                data: results,
            }));    
        });
    });
})

app.get('/create',(request, response) => {
    fs.readFile('public/create.html','utf-8',(error, data) => {
      if(error) throw error;
      response.send(data);
    })
  })

  app.post('/create', (request, response) => {
    const body = request.body;
    connection.query('INSERT INTO student (name, number, gender, phonenumber) VALUE (?, ?, ?, ?)',
    [body.name, body.number, body.gender, body.phonenumber], () => {
        response.redirect('/');
    });
});

app.get('/modify/:id', (request, response) => {
  fs.readFile('public/modify.html', 'utf-8', (error, data) => {
    connection.query('SELECT * from student WHERE num =?', [request.params.id], (error, results) => {
      if (error) throw error;
      console.log(request.params.id);
      response.send(ejs.render(data, {
        data: results[0],
      }));
    });
  });
});

app.post('/modify/:id', (request, response) => {
  const body = request.body;
  connection.query('UPDATE student SET name = ?, number = ?, gender = ?, phonenumber = ? WHERE num = ?', [body.name, body.number, body.gender, body.phonenumber, request.params.id], (error, results) => {
      if (error) throw error;
      response.redirect('/');
  });
});

app.get('/delete/:id', (request, response) => {
    connection.query('DELETE FROM student where num=?', [request.params.id], () => {
      response.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server is running port 3000!');
    // connection.connect();
});









