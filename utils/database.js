const mysql=require('mysql2');
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-complete',
    password:'sunnykumar@12'
})
module.exports=pool.promise();