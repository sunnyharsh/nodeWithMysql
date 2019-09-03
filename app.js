const express =require('express');
var bodyParser = require('body-parser')
const app=express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const db=require('./utils/database');
//Normal insert query
app.get('/insert', (req,res)=>{
    var sql = "INSERT INTO `products` (`title`, `price`, `desc`,`imageUrl`) VALUES ('angular','600','course VAILABLE','SDCDS');";
    db.execute(sql).then(()=>{
        res.status(200).json({
                msg:"success"
            })
    }).catch((err)=>{
        console.log(err)
    })
})
//dynamic insert query
app.post('/dynamicinsert', (req,res)=>{
    let title=req.body.title;
    let price=req.body.price;
    let desc=req.body.desc;
    let imageUrl=req.body.imageUrl;
    db.execute("INSERT INTO `products` (`title`, `price`, `desc`,`imageUrl`) VALUES (?, ?, ?, ?);",
    [title,price,desc,imageUrl]).then(()=>{
        res.status(200).json({
            msg:"sucess"
        })
    }).catch((err)=>{
        console.log(err)
    })
})
//fetch data from db
app.get('/fetch',((req,res)=>{
    db.execute('SELECT * FROM products')
        .then(([rows, fieldData])=>{
            console.log(rows)
        })
        .catch((err)=>{
            console.log(err)
        });
}))

//search by id
app.get('/searchByid', ((req,res)=>{
    db.execute('select * from `products` where id=?').then((data)=>{
        let result=JSON.stringify(data[0])
        console.log(result)
        res.status(200).json({
            finalData:result
        })
    }).catch((err)=>{
        console.log(err)
    })
}))
//delete by id
app.post('/delete',(req,res)=>{
    let id= req.body.id;
    let title= req.body.title;
    console.log(id)
    db.execute('DELETE FROM `products` WHERE `id` = ? && `title`= ? ',[id,title]).then((data)=>{
        console.log(data)
        res.status(200).json({
            msg:"delete successfully"
        })
    }).catch(err=>{
        console.log(err)
    })
})
app.listen(1234, ()=>{
    console.log("server start on 1234")
})