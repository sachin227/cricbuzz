const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const connStr="mongodb+srv://dbsachin:dbsachin@cluster1.sna0y.mongodb.net/edyoda?retryWrites=true&w=majority"
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}
mongoose.connect(connStr, options).then(
    ()=>{
        console.log("conection established")
    }
).catch((err)=>{
console.log(err)
})

const playerSchema= new mongoose.Schema({},{strict: false})
const player=mongoose.model("players",playerSchema)

app.get("/players" , async (req, res)=>{
var data = await player.find()
console.log(data)
if (!data || !data.length){
    return res.send("No data")
}
res.send(data)
})
app.post("/addplayers",async (req, res)=>{
    const addData = await player.insertMany([{
    name: 'Ishant Sherma',
    role: 'Bowler',
    team: 'India',
    preview: 'https://pbs.twimg.com/profile_images/1168925154912735233/CmuEZKou_400x400.jpg'},
    
    {
        name: 'Ricky Ponting',
        role: 'Batsman',
        team: 'Australia',
        preview: 'https://images.indianexpress.com/2018/07/ponting-m.jpg'
    
    }
    
    ])
console.log(addData)
res.send("data added successfully")

})
const port =3000
app.listen(port,()=>{console.log("Server Started >>>>>")})