const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./connection');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) ;

app.post('/add', async (req,res)=>{
    const [r] = await connection.add(req.body.name,req.body.age);
    if(!r.errors) res.send('added');
    else res.send('issue');
})

app.post('/view_one',async (req,res)=>{
    const data = await connection.view(req.body.name);
    if(data === null) res.send('none');
    else if(!data.errors) res.send(data._doc);
    else res.send('some issue');
})

app.get('/view_all',async (req,res)=>{
    const data = await connection.viewAll()
    if(data === null) res.send('none');
    else{
        let arr = [];
        for(let i=0;i<data.length;i++)
        {
            if(!data[i].errors) arr.push(data[i]._doc);
            else arr.push(data[i].errors);
        }
        
        res.send(JSON.stringify(arr))
    }
})

app.listen(4444,()=>{
    console.log('Listening at port 4444');
});