const mysql = requre('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bourneultimatum',
});

connection.connect((error) => {
    if(error){
        console.log('Error connection to MySQL Database');
        return;
    }
    console.log('Connection established successfully');
});
connection.end((error) => {
});