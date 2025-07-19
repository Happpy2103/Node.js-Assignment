const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send("Hello Node Js");
});

    res.send("this is page1");
});

app.get('/page2',(req,res)=>{
    res.send("this is page2");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});