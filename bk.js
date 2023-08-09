import express from "express";
import bodyparser from "body-parser";
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://ashok2468rajpute:R%40jpute8642%40shok@cluster0.rk3xxlh.mongodb.net/ToDoListDB');
const ListSchema = new mongoose.Schema({
task: String
});
 const ListModel= mongoose.model('ToDoList', ListSchema);



var port=3000;
var List=[];
var app=express();
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static('public'));

var days=["Sunday","Monday","Tuesday","Wednesday","Thuresday","Friday","Saturday"];
var month=["January ","February","March" ,"April" ,"May","June","July" ,"August" ,"September" ,"October","November","December" ]
const d = new Date();
var v=""+days[d.getDay()]+", "+month[d.getMonth()]+" "+d.getDate();

app.get('/',async function(req,res){
   List=await ListModel.find();
   //console.log(List);
    res.render('index.ejs',{data: List,hdata: v});


})
app.post('/',async function(req,res){
   var data=req.body;
  
   var datavalue=data.task;
   data.task='NONE';
   var del="";
   Object.values(data).forEach(async function (val){
    if(val!='NONE'){
      del= ""+val;
      await ListModel.deleteOne({_id: del});
    }
  }
  
  );
  //del="64d089844f3a0872e0579879";
//console.log(del);


// if(del!=""){
// await ListModel.deleteOne({_id: del});
// }
  //  Object.values(data).forEach(async function (val){
  //    if(val!='NONE')
  //    { del= `ObjectId("${val}")`
  //    console.log(del);
  //     
  //    }

  //  });

   if(datavalue!=''){
    await ListModel.insertMany([
      { task: datavalue }
    ]);
   
   }

   
   setTimeout( async function(){
    List=await ListModel.find();
     //console.log(List);
    res.render("index.ejs",{data: List,hdata: v});
  }, 1500);

     
   

})



app.listen(port,()=>{
   console.log(`server setup at ${port}`);
})




