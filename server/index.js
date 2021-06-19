import express from "express";
import helmet  from "helmet";
import morgan from "morgan";
import path from "path";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.MONGO_URL

// user collection 생성
// MongoClient.connect(url, 
//     {useNewUrlParser: true, useUnifiedTopology: true}, 
//     function(err, client) {
//         if(err) throw err;
//         const db = client.db("mydb")
//         db.createCollection('users', (err, res)=>{
//             if (err) throw err;
//             console.log("User collection is created!");
//             client.close();
//         })
//     }
// );
  
const app = express();

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../client')); 
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet());
app.use(morgan("dev"));


app.get('/',function(req,res){
    res.sendFile( path.join(__dirname, '../client/index.html'))
});

app.get('/score/board',function(req,res){
    res.render('score.pug')
});


app.get('/score/board/list',function async(req,res){
    MongoClient.connect(MONGO_URL, 
        {useNewUrlParser: true, useUnifiedTopology: true}, 
        function(err, client) {
            if(err) throw err;
            const collect = client.db("mydb").collection('users')
            const option = { 
                "sort":  [['score','desc'], ['name','asc']]
            };
            collect.find({}, option).toArray((err,value)=>{
                console.log(value)
                return res.status(200).json(value)
            })
        }
    );
});


app.post('/score/board/record',function(req,res){
    const { name , score } = req.body;
    const obj = { name, score };

    MongoClient.connect(MONGO_URL, 
        {useNewUrlParser: true, useUnifiedTopology: true}, 
        function(err, client) {
            if(err) throw err;
            const db = client.db("mydb");
            db.collection("users").insertOne(obj, function(err, res) {
                if (err) throw err;
                client.close();
            });
        }
    );

});

app.use((req, res)=>{
    res.end("404 NOT FOUND")
})

app.listen(4000, ()=>{
    console.log("listening on http://localhost:4000/ ✅")
})