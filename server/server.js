const path=require('path');
const express=require('express');

const port=process.env.port||3000;

const app=express();

const publicPath=path.join(__dirname,'../public');

app.use(express.static(publicPath));

app.get('/',(doc)=>{
  cnsole.log('document',doc);
});


app.listen(port,()=>{
  console.log(`Server started at port ${port}`);
});
